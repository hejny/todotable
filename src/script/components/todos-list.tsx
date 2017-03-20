import * as React from "react";
import * as Draggable from "react-draggable";

import {TodoItem} from "./todo-item";

import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';



export function TodosList(props) {

    const {state, dispatch} = props;
    var moved;


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

                    const todo = {
                        name:'Click!',
                        description: '## todo\n1) \n2) \n3) \n\n',
                        color: '#ccc',
                        done:false,
                        position: realCoords
                    };


                    dispatch({type:'CREATE_NEW_TODO',todo: todo});




                }

            }}
            className=""

        >


            <ul style={{

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


            >
                {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} id={todoKey}
                                                                   todo={state.todos[todoKey]} state={state}
                                                                   dispatch={dispatch}/>)}
            </ul>

        </Draggable>
    );

}
