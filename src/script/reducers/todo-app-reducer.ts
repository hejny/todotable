import * as Immutable from "immutable";

import { UUID } from 'angular2-uuid';


//import { ITodoAppState } from '../interfaces/todo-app-state';





function findTopZIndex(state){
    const todos = Object.values(state.get('todos').toJS());
    const maxZIndex = todos.reduce((maxZIndex,todo)=>Math.max(todo.zIndex||0,maxZIndex),0);
    return maxZIndex+1;
}



export function todoAppReducer(oldState,action){

    console.groupCollapsed(`==[${action.type}]==>`);
    console.log(oldState.toJS());
    console.log('||');
    console.log('||');


    console.log(`[${action.type}]`,action);
    const newState = todoAppReducerCore(oldState,action);

    console.log('||');
    console.log('||');
    console.log('\\/');
    console.log(newState.toJS());
    if(oldState.equals(newState)){
        console.log('==>States are equal');
    }
    console.groupEnd();



    return newState;

}



function todoAppReducerCore(state,action){




    if(action.type.indexOf('CURRENT_TODO')!==-1 && action.type!=='SELECT_CURRENT_TODO'){
        if(!state.get('current_todo_id')){
            throw new Error(`To dispatch "${action.type}" you should set current todo. `);
        }
    }



    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;

        case 'CREATE_NEW_TODO': {

            const newTodoId = UUID.UUID();

            return todoAppReducer(
                state.setIn(['todos', newTodoId], Immutable.fromJS(action.todo).set('zIndex',findTopZIndex(state))),
                {type: 'SELECT_CURRENT_TODO', todo_id: newTodoId}
            );

        }
        case 'SELECT_CURRENT_TODO':


            return state.set('current_todo_id', action.todo_id );

        case 'CLOSE_CURRENT_TODO':


            return state.set('current_todo_id', null );

        case 'DELETE_CURRENT_TODO': {


            const statePath = ['todos', state.get('current_todo_id')];
            return state.deleteIn(statePath).set('current_todo_id', null);

        }
        case 'CHANGE_CURRENT_TODO_KEY': {

            const statePath = ['todos', state.get('current_todo_id'), action.key];
            return state.setIn(statePath, action.value);


        }
        case 'TOGGLE_CURRENT_TODO_DONE': {

            const statePath = ['todos', state.get('current_todo_id'), 'done'];
            return state.setIn(statePath, !state.getIn(statePath)).set('current_todo_id', null);

        }
        case 'MOVE_CURRENT_TODO_TO_FRONT': {

            const statePath = ['todos', state.get('current_todo_id'),'zIndex'];
            return state.setIn(statePath, findTopZIndex(state));


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