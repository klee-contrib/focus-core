import clone from 'lodash/lang/cloneDeep';

/**
 * Check if the cloned object is an empty object. If yes, take the original, else take the cloned one.
 *
 * @param {any} cloned cloned object
 * @param {any} original original object
 * @returns {any} the chosen object
 */
function choose(cloned, original) {
    // If the original is {}, still take the cloned one
    if (original && original.constructor === Object && Object.keys(original).length === 0) {
        return cloned;
    }
    // Take the cloned one, if it's not {} (not cloneable object)
    return (cloned && cloned.constructor === Object && Object.keys(cloned).length === 0) ? original : cloned;
}

/**
 * Wrapper around an inner Map, cloning in-going and out-going object if possible, mimicking Immutable.
 *
 * @class CloningMap
 */
class CloningMap {

    /**
     * Creates an instance of CloningMap.
     * @memberof CloningMap
     */
    constructor() {
        // eslint-disable-next-line no-undef
        this.innerMap = new Map();
    }

    /**
     * Size of the map.
     *
     * @readonly
     * @memberof CloningMap
     */
    get size() {
        return this.innerMap.size;
    }

    /**
     * Check if the key is present in the map.
     *
     * @param {any} key the key
     * @returns {boolean} true if present, else false
     * @memberof CloningMap
     */
    has(key) {
        return this.innerMap.has(key);
    }

    /**
     * Get the value for the key in the map, or undefined if not found.
     *
     * @param {any} key the key
     * @returns {any} the value
     * @memberof CloningMap
     */
    get(key) {
        const obj = this.innerMap.get(key);
        if (obj && obj.constructor === CloningMap) {
            return obj.toJS();
        }
        const clonedObj = clone(obj);
        return choose(clonedObj, obj);
    }

    /**
     * Set a value in the Map, for the given key.
     *
     * @param {any} key the key
     * @param {any} value the value to set
     * @returns {CloningMap} the current store
     * @memberof CloningMap
     */
    set(key, value) {
        const clonedObj = clone(value);
        this.innerMap.set(key, choose(clonedObj, value));
        return this;
    }

    /**
     * Clear the map.
     *
     * @returns {CloningMap} the current map
     * @memberof CloningMap
     */
    clear() {
        this.innerMap.clear();
        return this;
    }

    /**
     * Delete the given key and its value from the map.
     *
     * @param {any} key the key to delete
     * @returns {CloningMap} the current Map
     * @memberof CloningMap
     */
    delete(key) {
        this.innerMap.delete(key);
        return this;
    }

    /**
     * Creates an object representing this map.
     *
     * @returns {object} an object representing this store
     * @memberof CloningMap
     */
    toJS() {
        const res = {};
        this.innerMap.forEach((value, key) => {
            if (value && value.constructor === CloningMap) {
                res[key] = value.toJS();
            } else {
                const clonedObj = clone(value);
                res[key] = choose(clonedObj, value);
            }
        });
        return res;
    }

    /**
     * Merge an object with this Map.
     *
     * @param {any} toMerge the object to merge with this map
     * @returns {CloningMap} this Map
     * @memberof CloningMap
     */
    merge(toMerge) {
        Object.keys(toMerge).forEach((key) => {
            this.set(key, toMerge[key]);
        });
        return this;
    }

    /**
     * Check if there is an element deep-nested.
     *
     * @param {Array} array path to element
     * @returns {boolean} true if there is an element, else false
     * @memberof CloningMap
     */
    hasIn(array) {
        if (!array || array.length <= 0) {
            return false;
        }
        const key = array[0];
        if (array.length === 1) {
            return this.innerMap.has(key);
        }
        const value = this.innerMap.get(key);
        if (value && value.constructor === CloningMap && array.length > 1) {
            return value.hasIn(array.slice(1));
        }
        return false;
    }

    /**
     * Get an element deep-nested.
     *
     * @param {Array} array path to element
     * @returns {any} the deep nested element, or undefined
     * @memberof CloningMap
     */
    getIn(array) {
        if (!array || array.length <= 0) {
            return undefined;
        }
        const key = array[0];
        if (array.length === 1) {
            return this.get(key);
        }
        const value = this.innerMap.get(key);
        if (value && value.constructor === CloningMap && array.length > 1) {
            return value.getIn(array.slice(1));
        }
        return undefined;
    }

    /**
     * Deep merge the object in this map, creating nested maps
     *
     * @param {any} toMerge object to merge
     * @returns {CloningMap} the map, with merged data
     * @memberof CloningMap
     */
    mergeDeep(toMerge) {
        Object.keys(toMerge).forEach((key) => {
            const value = toMerge[key];
            if (value && value.constructor === Object) {
                const newVal = new CloningMap();
                this.innerMap.set(key, newVal.mergeDeep(value));
            } else {
                this.set(key, value);
            }
        });
        return this;
    }

}

export default CloningMap;