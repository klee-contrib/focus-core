import {handleViewAction as dispatch} from '../dispatcher';

/**
 * This function aims to have the same behaviour as JS confirm.
 * @param  {string | numver | component} ContentComponent - The component to display in the conform message.
 * @return {Promise}Confirm is a promise in order to be able to provide success and error callbacks.
 */
export default function confirm(ContentComponent){
    return new Promise((resolve, reject) => {
        dispatch({
            data: {
                confirmConfig:{
                    isVisible: true,
                    Content: ContentComponent,
                    handleCancel(data){
                        dispatch({data: {confirmConfig: {isVsible: false, Content: null}}, type: 'update'});
                        //Maybe there is a little async problem.
                        // We could listen to the store once on the change it is time to call resolve.
                        resolve(data);
                    },
                    handleConfirm(err){
                        dispatch({data: {confirmConfig: {isVsible: false, Content: null}}, type: 'update'});
                        reject(err);
                    }
                }
            },
            type: 'update'
        });
    });
}


//Example call
///**
/// confirm('Is it good for you ?').then(() => action.save()).catch(() => displaySave())
/// confirm(MyAwesomeComponentWhichWillBeRenderAsCOntent).then(() => action.save()).catch(() => displaySave())
////
