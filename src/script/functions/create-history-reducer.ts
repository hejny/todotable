import {API_URL} from '../config';

import * as _ from "lodash";

import {makeRequest} from '../resources/make-request';


export function createHistoryReducer(reducer,getTitleFromState,getUriFromState){



    let stateWaitingForPush;



    const debouncedPushState = _.debounce(()=>{


        const state = stateWaitingForPush.toJS();
        history.pushState(state, getTitleFromState(state),getUriFromState(state));
        document.title = getTitleFromState(state);



        makeRequest('POST',API_URL,JSON.stringify(state.todos),{'Content-Type':'application/json'});






    },500);




    return function(state,action){


        const newState = reducer(state,action);
        stateWaitingForPush = newState;

        if(action.type!=='CHANGE_STATE' && action.type!=='@@redux/INIT'){

            debouncedPushState();

        }

        return(newState);

    }


}
