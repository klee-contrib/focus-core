/* global  _ , window */
"use strict";
(function(NS) {
    //Filename: helpers/util_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var JSON = {};

    // Unflatten a json object.
    // from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
    // Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
    JSON.unflatten = function (data) {
        if (Object(data) !== data || Array.isArray(data))
            return data;
        if ("" in data)
            return data[""];
        var result = {}, cur, prop, idx, last, temp;
        for (var p in data) {
            cur = result;
            prop = "";
            last = 0;
            do {
                idx = p.indexOf(".", last);
                temp = p.substring(last, idx !== -1 ? idx : undefined);
                cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                prop = temp;
                last = idx + 1;
            } while (idx >= 0);
            cur[prop] = data[p];
        }
        return result[""];
    };

    //Flatten a json object.
    // from an object`{contact: {nom: "nom", prenom: "prenom"}}` 
    // Gives a one level object:  `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
    JSON.flatten = function (data) {
        var result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop ? prop + "." + i : "" + i);
                if (l === 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    };
    //Deeply combine two json.
    function combine(json1, json2) {
        var res = {};
        _.extend(
             res,
             JSON.flatten(json1),
             JSON.flatten(json2)
        );
        return JSON.unflatten(res);
    }

    //This method allows the user to load a data (objet or list) in a promise
    // Exampl call: refHelper.loadLocalData([{id: 1, label: "nom 1"}, {id: 1, label: "nom 2"}])
    var loadLocalData = function loadLocalData(data) {
        return new Promise(function promiseLoadLocalList(resolve, reject) {
            resolve(data);
        });
    };

    //Util helper.
    var utilHelper = {
        flatten: JSON.flatten,
        unflatten: JSON.unflatten,
        combine: combine,
        loadLocalData: loadLocalData
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.utilHelper = utilHelper;
    } else {
        module.exports = utilHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);