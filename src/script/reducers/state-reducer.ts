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




    switch (action.type) {


        //todo deprecated
        case 'CHANGE_STATE':

            return action.state;

        case 'MULTIACTION':

            return action.actions.reduce(stateReducer,state);


        case 'VIEW_CHANGE':


            return state.set('view', action.view );//todo check possible views (or has action for each)
        case 'RESOURCE_CREATE':


            return state.update('resources',

                (resources)=>resources.push(Immutable.fromJS(action.resource)))

            );


        case 'RESOURCE_CHANGE_KEY':{


            if(action.key==='primary' && action.value===true){


                let resourcesJS = state.get('resources').toJS();
                const oldRatio = resourcesJS.find((resource)=>resource.primary).ratio;
                const newRatio = resourcesJS[action.resource_id].ratio;

                console.log(newRatio);

                resourcesJS.forEach((resource)=>{

                    resource.primary=false;
                    resource.ratio /= newRatio;
                    resource.ratio = Math.round(resource.ratio*100)/100;


                });

                //console.log(resourcesJS);

                state = state.set('resources',Immutable.fromJS(resourcesJS));


                //unset
                //change ratios
            }


            const statePath = ['resources', action.resource_id, action.key];
            return state.setIn(statePath, action.value);


        }

        case 'RESOURCE_DELETE':

            const statePath = ['resources', action.resource_id];
            return state.deleteIn(statePath);

        case 'TODO_CREATE': {


            state = state.update('todos',

                (todos)=>todos.push(Immutable.fromJS(action.todo).set('zIndex',findTopZIndex(state)))

            );


            return stateReducer(state, {type: 'CURRENT_TODO_SELECT', todo_id: state.get('todos').size-1});

        }
        case 'CURRENT_TODO_SELECT':


            return state.set('current_todo_id', action.todo_id );

        case 'CURRENT_TODO_CLOSE':


            const current_todo = state.getIn(['todos', state.get('current_todo_id')]).toJS();

            if(!current_todo.name && !current_todo.description){
                return stateReducer(state,{type:'TODO_DELETE',todo_id:state.get('current_todo_id')});
            }else{
                return state.set('current_todo_id', -1 );
            }



        case 'TODO_DELETE': {


            const statePath = ['todos', action.todo_id];
            return state.deleteIn(statePath).set('current_todo_id', -1);//todo ??

        }
        case 'TODO_CHANGE_KEY': {

            if(action.key==='name'){



                let uriBase = createUriFromName(action.value);
                let uri = uriBase;

                for(let uriIncrement=1;state.get('todos').toJS().some((todo)=>todo.uri===uri);uriIncrement++){
                    uri = uriBase+'-'+uriIncrement;
                }



                state = stateReducer(state,{type:'TODO_CHANGE_KEY',key:'uri',value:uri,todo_id:state.get('current_todo_id')});




            }


            const statePath = ['todos', action.todo_id, action.key];
            return state.setIn(statePath, action.value);


        }

        case 'TODO_ADD_DONE_TIME': {

            const statePath = ['todos', action.todo_id, 'done_times'];
            state = state.updateIn(statePath,

                (todos)=>todos.push(action.date / 1)//todo is thare a better way to convert Date to integer

            );

        }
        case 'TODO_DELETE_DONE_TIME': {

            const statePath = ['todos', action.todo_id, 'done_times',action.index];
            return state.deleteIn(statePath);


        }
        case 'TODO_TOGGLE_WIDTH': {

            const statePath = ['todos', action.todo_id, 'width'];

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
        case 'TODO_CHANGE_RESOURCE': {


            const statePath = ['todos', action.todo_id, action.direction,action.resource_id];
            return state.setIn(statePath, action.value);


        }




        case 'TODO_MOVE_TO_FRONT': {

            const statePath = ['todos', action.todo_id,'zIndex'];
            return state.setIn(statePath, findTopZIndex(state));


        }
        case 'TODO_MOVE': {

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

        /*case 'TABLE_VIEW_CHANGE_PAGE':
            return state.set('page',action.page);
        case 'TABLE_VIEW_CHANGE_ONPAGE':
            return state.set('onpage',action.onpage);*/
        case 'TABLE_VIEW_SORT_BY':{

                if (state.get('sort_by') === action.sort_by) {
                    if (state.get('sort_direction') === 'ascending') {
                        return state.set('sort_direction', 'descending');
                    }else{
                        return state.set('sort_direction', 'ascending');
                    }
                }else {
                    return state.set('sort_by', action.sort_by);

                }
            }
        default:
            return state
        }



}