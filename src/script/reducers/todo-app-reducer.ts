


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_CURRENT_TODO_NAME':

            return state.setIn(['current_todo','name'], action.todo );


        case 'COMMIT_CURRENT_TODO':

            return state.update('todos', todos=>todos.push(state.get('current_todo')) ).setIn(['current_todo','name'],'');

        default:
            return state
    }



}