/**
* Build the cartridge store definition.
* @return {object} - The cartridge component.
*/
export default function cartridgeDefinitionBuilder() {
    return ['summaryComponent', 'barContentLeftComponent', 'barContentRightComponent', 'cartridgeComponent', 'actions', 'mode', 'route', 'confirmConfig', 'canDeploy']
    .reduce((def, node) => {
        def[node] = node;
        return def;
    }, {});
}
