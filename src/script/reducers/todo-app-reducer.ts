import * as Immutable from "immutable";

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


        case 'MOVE_TODO':

            const path = ['todos',action.id,'position'];
            return state.setIn(path, Immutable.fromJS(action.position));

        case 'MOVE_BY_LIST':


            const oldPosition = state.get('list_position').toJS();
            const newPosition = {
                x: oldPosition.x + action.position.x,
                y: oldPosition.y + action.position.y
            };

            //console.log(oldPosition);
            //console.log(newPosition);


            return state.set('list_position', Immutable.fromJS(newPosition));



        default:
            return state
    }



}