import ReactDOM from 'react-dom';
import mountedComponents from './mounted-components';

/**
* Clear a react component.
* @param {String} targetSelector - the component's DOM selector
*/
export default function clearComponent(targetSelector) {
    if (mountedComponents[targetSelector]) {
        ReactDOM.unmountComponentAtNode(document.querySelector(targetSelector));
        delete mountedComponents[targetSelector];
        console.info('Component ' + targetSelector + ' unmounted.');
    }
};
