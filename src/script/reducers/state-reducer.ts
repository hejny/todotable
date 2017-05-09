import * as Immutable from "immutable";

//import { UUID } from 'angular2-uuid';


//import { ITodoAppState } from '../interfaces/todo-expressApp-state';

import {createUriFromName} from '../functions/create-uri-from-name';
import {TODO_WIDTHS,EMPTY_TODO} from '../config';




function findTopZIndex(state){
    const todos = Object.values(state.get('todos').toJS());
    const maxZIndex = todos.reduce((maxZIndex,todo)=>Math.max(todo.zIndex||0,maxZIndex),0);
    return maxZIndex+1;
}






export function stateReducer(state,action){




    if(action.type.indexOf('CURRENT_TODO')!==-1 && action.type!=='SELECT_CURRENT_TODO'){
        if(state.get('current_todo_id')===-1){
            throw new Error(`To dispatch "${action.type}" you should set current todo. `);
        }
    }



    switch (action.type) {


        //todo deprecated
        case 'CHANGE_STATE':

            return action.state;

        case 'MULTIACTION':

            return action.actions.reduce(stateReducer,state);


        case 'CREATE_NEW_TODO': {


            state = state.update('todos',

                (todos)=>todos.push(Immutable.fromJS(action.todo).set('zIndex',findTopZIndex(state)))

            );



            return stateReducer(state, {type: 'SELECT_CURRENT_TODO', todo_id: state.get('todos').size-1});

        }
        case 'SELECT_CURRENT_TODO':


            return state.set('current_todo_id', action.todo_id );

        case 'CLOSE_CURRENT_TODO':


            const current_todo = state.getIn(['todos', state.get('current_todo_id')]).toJS();

            if(!current_todo.name && !current_todo.description){
                return stateReducer(state,{type:'DELETE_CURRENT_TODO'});
            }else{
                return state.set('current_todo_id', -1 );
            }



        case 'DELETE_CURRENT_TODO': {


            const statePath = ['todos', state.get('current_todo_id')];
            return state.deleteIn(statePath).set('current_todo_id', -1);//todo recursion

        }
        case 'CHANGE_CURRENT_TODO_KEY': {

            if(action.key==='name'){



                let uriBase = createUriFromName(action.value);
                let uri = uriBase;

                for(let uriIncrement=1;state.get('todos').toJS().some((todo)=>todo.uri===uri);uriIncrement++){
                    uri = uriBase+'-'+uriIncrement;
                }



                state = stateReducer(state,{type:'CHANGE_CURRENT_TODO_KEY',key:'uri',value:uri});




            }


            const statePath = ['todos', state.get('current_todo_id'), action.key];
            return state.setIn(statePath, action.value);


        }
        //todo all actions should begin with CURRENT_TODO
        case 'CURRENT_TODO_ADD_DONE_TIME': {

            const statePath = ['todos', state.get('current_todo_id'), 'done_times'];
            state = state.updateIn(statePath,

                (todos)=>todos.push(action.date/1)//todo is thare a better way to convert Date to integer

            );
        case 'CURRENT_TODO_DELETE_DONE_TIME': {

                const statePath = ['todos', state.get('current_todo_id'), 'done_times',action.index];
                return state.deleteIn(statePath);


            }
        case 'TOGGLE_CURRENT_TODO_WIDTH': {

            const statePath = ['todos', state.get('current_todo_id'), 'width'];

            const oldWidth = state.getIn(statePath);
            const oldWidthIndex = TODO_WIDTHS.indexOf(oldWidth);
            let newWidth:number;

            if(oldWidthIndex===-1){
                newWidth = EMPTY_TODO.width;
            }else
            if(oldWidthIndex<TODO_WIDTHS.length-1){
                newWidth = TODO_WIDTHS[oldWidthIndex+1];
            }else{
                newWidth = TODO_WIDTHS[0];
            }

            return state.setIn(statePath, newWidth);

        }
        case 'CHANGE_CURRENT_TODO_INPUT': {


            const statePath = ['todos', state.get('current_todo_id'), 'inputs',action.resource];
            return state.setIn(statePath, action.value);


        }
        case 'CHANGE_CURRENT_TODO_OUTPUT': {


            const statePath = ['todos', state.get('current_todo_id'), 'outputs',action.resource];
            return state.setIn(statePath, action.value);


        }
        /*case 'CHANGE_CURRENT_TODO_INPUT_NAME': {


            const statePathOld = ['todos', state.get('current_todo_id'), 'inputs',action.oldName];
            const statePathNew = ['todos', state.get('current_todo_id'), 'inputs',action.newName];
            return state.setIn(statePathNew, state.getIn(statePathOld)).deleteIn(statePathOld);


        }*/














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