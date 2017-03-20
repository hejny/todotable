import * as Immutable from "immutable";

import { UUID } from 'angular2-uuid';


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;

        case 'CREATE_NEW_TODO': {

            const newTodoId = UUID.UUID();

            return todoAppReducer(
                state.setIn(['todos', newTodoId], Immutable.fromJS(action.todo)),
                {type: 'CHANGE_CURRENT_TODO', todo_id: newTodoId}
            );

        }
        case 'CHANGE_CURRENT_TODO':


            return state.set('current_todo_id', action.todo_id );

        case 'CLOSE_CURRENT_TODO':


            return state.set('current_todo_id', null );

        case 'DELETE_CURRENT_TODO': {


            const statePath = ['todos', state.get('current_todo_id')];
            return state.deleteIn(statePath).set('current_todo_id', null);

        }
        case 'CHANGE_CURRENT_TODO_NAME': {

            const statePath = ['todos', state.get('current_todo_id'), 'name'];
            return state.setIn(statePath, action.todo_name);

        }
        case 'CHANGE_CURRENT_TODO_KEY': {

            const statePath = ['todos', state.get('current_todo_id'), action.key];
            return state.setIn(statePath, action.value);


        }
        case 'TOGGLE_CURRENT_TODO_DONE': {

            const statePath = ['todos', state.get('current_todo_id'), 'done'];
            return state.setIn(statePath, !state.getIn(statePath)).set('current_todo_id', null);

        }
        case 'MOVE_TODO': {

            const statePath = ['todos', action.id, 'position'];
            return state.setIn(statePath, Immutable.fromJS(action.position));

        }
        case 'OBSERVER_MOVE_BY': {


            const oldPosition = state.get('observer_position').toJS();
            const newPosition = {
                x: oldPosition.x + action.position.x,
                y: oldPosition.y + action.position.y
            };

            //console.log(oldPosition);
            //console.log(newPosition);


            return state.set('observer_position', Immutable.fromJS(newPosition));


        }
        case 'OBSERVER_ZOOM_LOGARITHM_BY':

            return state.update('observer_zoom_logarithm', (zoom)=>zoom+action.delta);


        default:
            return state
    }



}