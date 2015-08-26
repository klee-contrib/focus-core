/**
* Build the cartridge store definition.
* @return {object} - The cartridge component.
*/
'use strict';

module.exports = function () {
    return ['summaryComponent', 'barContentLeftComponent', 'barContentRightComponent', 'cartridgeComponent', 'actions', 'mode', 'route'].reduce(function (def, node) {
        def[node] = node;
        return def;
    }, {});
};