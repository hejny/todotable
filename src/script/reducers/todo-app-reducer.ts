


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_CURRENT_TODO':

            return state.set('current_todo', action.todo );


        case 'COMMIT_CURRENT_TODO':

            return state.update('todos', todos=>todos.push(state.get('current_todo')) );

        default:
            return state
    }


}