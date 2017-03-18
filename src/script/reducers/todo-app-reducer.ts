


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {
        case 'ADD_TODO':

            return state.update('todos', todos=>todos.push(action.todo) );

        default:
            return state
    }


}