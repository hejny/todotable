import { UUID } from 'angular2-uuid';


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_CURRENT_TODO_NAME':

            return state.setIn(['current_todo','name'], action.todo );


        case 'COMMIT_CURRENT_TODO':

            return state.setIn(['todos',UUID.UUID()], state.get('current_todo') ).setIn(['current_todo','name'],'');
            //return state.update('todos', todos=>todos.push(state.get('current_todo')) ).setIn(['current_todo','name'],'');

        case 'MAKE_TODO_DONE':

            return state.setIn(['todos',action.id,'done'], true);



        default:
            return state
    }



}