import * as Immutable from "immutable";

import { UUID } from 'angular2-uuid';


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;

        case 'CREATE_NEW_TODO':

            return state.setIn(['todos',UUID.UUID()], Immutable.fromJS(action.todo) );


        case 'CHANGE_CURRENT_TODO_NAME':

            return state.setIn(['current_todo','name'], action.todo_name );


        case 'COMMIT_CURRENT_TODO':

            return state.setIn(['todos',UUID.UUID()], state.get('current_todo') ).setIn(['current_todo','name'],'');

        case 'TOGGLE_TODO_DONE':

            const path = ['todos',action.id,'done'];
            return state.setIn(path, !state.getIn(path));


        case 'MOVE_TODO':

            const path = ['todos',action.id,'position'];
            return state.setIn(path, Immutable.fromJS(action.position));

        case 'OBSERVER_MOVE_BY':


            const oldPosition = state.get('observer_position').toJS();
            const newPosition = {
                x: oldPosition.x + action.position.x,
                y: oldPosition.y + action.position.y
            };

            //console.log(oldPosition);
            //console.log(newPosition);


            return state.set('observer_position', Immutable.fromJS(newPosition));



        default:
            return state
    }



}