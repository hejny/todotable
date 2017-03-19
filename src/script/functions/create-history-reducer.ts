



export function createHistoryReducer(reducer,){

    return function(state,action){


        const newState = reducer(state,action);

        if(action.type!=='CHANGE_STATE' && action.type!=='@@redux/INIT'){
            history.pushState(newState.toJS(), '', '#');

        }

        return(newState);

    }


}
