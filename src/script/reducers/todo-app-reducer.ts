

export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {
        case 'ADD':
            return state.concat([action.todo]);

        default:
            return state
    }

}