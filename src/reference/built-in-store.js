import ReferenceStore from '../store/reference'


let ref ;
/**
* Built the store in order to the .
* @return {ReferenceStore} - An instanciated reference store.
*/
export default () => {
	if(!ref){
		ref = new ReferenceStore();
	}
	return ref;
};
