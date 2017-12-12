
/**
* Wraps a function with a rate limiting management.
* The wrapped function is allowed to burst 'burstNb' calls in the 'burstPeriod' period.
* If this limit is reached, the rate limiting enters in "cooldown mode" : 
* the calls are evenly scheduled making cooldownNb calls in cooldownPeriod period.

* @param {function} fn The function we need to rate limit
* @param {number} burstNb The number of call allowed in burst mode
* @param {number} burstPeriod The period of time in ms in burst mode
* @param {number} cooldownNb The number of calls allowed in cooldown mode
* @param {number} cooldownPeriod The period of time in ms in cooldown mode
* @return {function} A function rate limited with the provided parameters
*/
export default function ratelimiter(fn, burstNb, burstPeriod, cooldownNb, cooldownPeriod) {
    let burstMode = true;
    let priorExecsBurst = [];
    let priorExecsCooldown = [];
    let calls = [];
    let dequeueTimer;

    const dequeue = function dequeue() {
        const now = Date.now();

        if (burstMode) {
            priorExecsBurst = priorExecsBurst.filter(execTime => now - execTime < burstPeriod);

            while (priorExecsBurst.length < burstNb && calls.length > 0) {
                priorExecsBurst.push(now);

                const [resolve, ...currentCall] = calls.shift();
                resolve(fn.apply(null, currentCall));
            }
        } else {
            priorExecsCooldown = priorExecsCooldown.filter(execTime => now - execTime < cooldownPeriod);

            if (priorExecsCooldown.length < cooldownNb && calls.length > 0) {
                priorExecsCooldown.push(now);

                const [resolve, ...currentCall] = calls.shift();
                resolve(fn.apply(null, currentCall));
            }
        }

        if ((!burstMode && priorExecsCooldown.length === 0) || (burstMode && priorExecsBurst.length === 0)) {
            // No call to process. We can unregister our dequeue loop.
            clearTimeout(dequeueTimer);
            dequeueTimer = null;
        } else {
            const timeout = burstMode ? burstPeriod - (now - priorExecsBurst[0]) : cooldownPeriod / cooldownNb;
            dequeueTimer = setTimeout(dequeue, timeout);
        }

        if (burstMode && priorExecsBurst.length === burstNb) {
            // We have reached the number of call allowed in burst mode.
            // Entering in cooldown mode.
            burstMode = false;
        } else if (!burstMode && priorExecsCooldown.length === 0) {
            // We have dequeued all the requests in cooldown mode.
            // We are allowed to enter in burst mode again.
            burstMode = true;
        }
    }

    let registerCall = function registerCall() {
        return new Promise((resolve, reject) => {
            //We register the call.
            calls.push([resolve, ...arguments]);
            if (!dequeueTimer) {
                // This call will be processed by the dequeue reactor function.
                dequeueTimer = setTimeout(dequeue, 0);
            }
        });
    }

    return registerCall;
}
