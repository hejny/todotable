
import * as _ from "lodash";


export function createHistoryReducer(reducer,getTitleFromState,getUriFromState){



    let stateWaitingForPush;



    const debouncedPushState = _.debounce(()=>{


        const state = stateWaitingForPush.toJS();
        history.pushState(state, getTitleFromState(state),getUriFromState(state));
        document.title = getTitleFromState(state);

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
