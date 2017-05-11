
function ratelimiter(fn, burstNb, burstPeriod, cooldownNb, cooldownPeriod) {
    let burstMode = true;
    let priorExecsBurst = [];
    let priorExecsCooldown = [];
    let calls = [];
    let dequeueTimer;

    let dequeue =  function() {
        let now = Date.now();
        
        if (burstMode) {
            priorExecsBurst = priorExecsBurst.filter( execTime => now - execTime < burstPeriod);

            while (priorExecsBurst.length < burstNb && calls.length > 0) {
                priorExecsBurst.push(now);

                let currentCall = calls.shift();
                fn.apply(null, currentCall);
            }
        } else {
            priorExecsCooldown = priorExecsCooldown.filter( execTime => now - execTime < cooldownPeriod);
            
            if (priorExecsCooldown.length < cooldownNb && calls.length > 0) {
                priorExecsCooldown.push(now);

                let currentCall = calls.shift();
                fn.apply(null, currentCall);
            }
        }

        if ((!burstMode && priorExecsCooldown.length == 0) || (burstMode && priorExecsBurst.length == 0)) {
            clearTimeout(dequeueTimer);
            dequeueTimer = null;
        } else {
            let timeout = burstMode ? burstPeriod - (now - priorExecsBurst[0]) : cooldownPeriod / cooldownNb;
            dequeueTimer = setTimeout(dequeue, timeout);
        }

        if (burstMode && priorExecsBurst.length == burstNb) {
            burstMode = false;
        } else if (!burstMode && priorExecsCooldown.length == 0) {
            burstMode = true;
        }
    }
    
    let registerCall = function () {
        calls.push([...arguments]);
        if (!dequeueTimer) {
            dequeueTimer = setImmediate(dequeue);
        }
    }

    return registerCall;
}

module.exports = ratelimiter;