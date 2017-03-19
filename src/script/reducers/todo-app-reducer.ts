import { UUID } from 'angular2-uuid';


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;


        case 'CHANGE_CURRENT_TODO_NAME':

            return state.setIn(['current_todo','name'], action.todo );


        case 'COMMIT_CURRENT_TODO':

            return state.setIn(['todos',UUID.UUID()], state.get('current_todo') ).setIn(['current_todo','name'],'');
            //return state.update('todos', todos=>todos.push(state.get('current_todo')) ).setIn(['current_todo','name'],'');

        case 'TOGGLE_TODO_DONE':

            const path = ['todos',action.id,'done'];
            return state.setIn(path, !state.getIn(path));



        default:
            return state
    }



}