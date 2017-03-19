import * as Immutable from "immutable";

import { UUID } from 'angular2-uuid';


export function todoAppReducer(state,action){

    console.log(action.type);


    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;

        case 'CREATE_NEW_TODO':


            const newTodoId = UUID.UUID();

            const newState = todoAppReducer(

                state.setIn(['todos',newTodoId], Immutable.fromJS(action.todo) ),
                {type:'CHANGE_CURRENT_TODO',todo_id:newTodoId}

            );

            return newState;


        case 'CHANGE_CURRENT_TODO':


            return state.set('current_todo_id', action.todo_id );

        case 'CLOSE_CURRENT_TODO':


            return state.set('current_todo_id', null );

        case 'DELETE_CURRENT_TODO':


            const path = ['todos',state.get('current_todo_id')];
            return state.deleteIn(path).set('current_todo_id', null );


        case 'CHANGE_CURRENT_TODO_NAME':

            const path = ['todos',state.get('current_todo_id'),'name'];
            return state.setIn(path, action.todo_name );


        case 'TOGGLE_CURRENT_TODO_DONE':

            const path = ['todos',state.get('current_todo_id'),'done'];
            return state.setIn(path, !state.getIn(path) ).set('current_todo_id', null );


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