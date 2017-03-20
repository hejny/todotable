import * as React from "react";
import * as Draggable from "react-draggable";

import {TodoItem} from "./todo-item";

import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';

import {INITIAL_TODO} from '../config';


export function TodosList(props) {

    const {state, dispatch} = props;
    var moved;

    var mouseRealCoords;

    return (
        <Draggable

            position={{x:0,y:0}}


            onStart={(event)=>{



                event.stopPropagation();
                event.preventDefault();
                moved = false;

            }}
            onDrag={(event)=>{
                event.stopPropagation();
                event.preventDefault();
                moved = true;
            }}
            onStop={(event,object) => {

                event.stopPropagation();
                event.preventDefault();



                if(moved){

                    const zoom_multiplier = countZoomMultiplier(state);
                    dispatch({type:'OBSERVER_MOVE_BY',position:{x:-object.x/zoom_multiplier,y:-object.y/zoom_multiplier}});
                    //onStop(event,object);

                }else{


                    const realCoords = screenCoordsToRealCoords({
                        x:event.offsetX - event.target.offsetWidth/2,
                        y:event.offsetY - event.target.offsetHeight/2
                    },state);

                    /*const position = {
                        x: state.observer_position.x + event.offsetX - event.target.offsetWidth/2,
                        y: state.observer_position.y + event.offsetY - event.target.offsetHeight/2,
                    };*/


                    const todo = Object.assign({},INITIAL_TODO,{
                        position: realCoords
                    });


                    dispatch({type:'CREATE_NEW_TODO',todo: todo});




                }

            }}
            className=""

        >


            <ul className="todo-list" style={{

            //border: '1px solid blue',


            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
            top:0,
            left:0,

            filter: state.current_todo_id?'blur(5px) opacity(30%)':'',
            //pointerEvents: state.current_todo_id?'none':'auto',


        }}


            onMouseMove={(event)=> {
                mouseRealCoords = screenCoordsToRealCoords({
                    x:event.nativeEvent.offsetX - event.target.offsetWidth/2,
                    y:event.nativeEvent.offsetY - event.target.offsetHeight/2
                },state);
            }}


            tabIndex="1"
            onMouseEnter={(event)=> {
                event.stopPropagation();
                event.preventDefault();
                event.target.focus();
            }}
            onMouseLeave={(event)=> {
                event.stopPropagation();
                event.preventDefault();
                event.target.blur();
            }}
            onKeyPress={(event)=> {
                event.stopPropagation();
                event.preventDefault();


                if(typeof mouseRealCoords === 'undefined'){
                    throw new Error('I dont know position.');
                }

                const todo = Object.assign({},INITIAL_TODO,{
                    position: mouseRealCoords,
                    name: event.key
                });

                dispatch({type:'CREATE_NEW_TODO',todo: todo});
                //dispatch({type:'CLOSE_CURRENT_TODO'});



            }}


            >
                {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} id={todoKey}
                                                                   todo={state.todos[todoKey]} state={state}
                                                                   dispatch={dispatch}/>)}
            </ul>

        </Draggable>

    );

}
