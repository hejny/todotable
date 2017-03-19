
import * as _ from "lodash";


export function createHistoryReducer(reducer,){



    let stateWaitingForPush;



    const debouncedPushState = _.debounce(()=>{

        history.pushState(stateWaitingForPush.toJS(), '', '#');

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
