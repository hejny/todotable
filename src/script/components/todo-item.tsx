import * as React from "react";
import * as Draggable from "react-draggable";

import * as tinycolor from "tinycolor2";

import {realCoordsToscreenCoords,screenCoordsToRealCoords} from '../functions/coords';


export function TodoItem(props) {

    const {todo, id, state, dispatch} = props;

    let moved;



    /*const position = {
        x: todo.position.x - state.observer_position.x,
        y: todo.position.y - state.observer_position.y
    };

    const zoom_multiplier = Math.pow(2,state.observer_zoom_logarithm);
    const position_zoom = {
        x: position.x * zoom_multiplier,
        y: position.y * zoom_multiplier,
    };*/

    const position = realCoordsToscreenCoords(todo.position,state);


    return (
        <Draggable

            position={position}


            onStart={(event)=>{

                event.stopPropagation();
                event.preventDefault();
                moved = false;
            }}
            onDrag={(event)=>{
                event.preventDefault();
                moved = true;
            }}
            onStop={(event,object) => {

                event.stopPropagation();
                event.preventDefault();

                if(moved){


                    dispatch({type:'MOVE_TODO',id:id,position:screenCoordsToRealCoords(object,state)});
                    //onStop(event,object);

                }else{

                    dispatch({type:'CHANGE_CURRENT_TODO',todo_id:id});
                }

        }}


            className=""

        >

            <li style={{
            position: 'absolute',
            top: '50%',
            left: 'calc( 50% - 50px )',



            listStyle: 'none',
            width: 100,
            height: 30,
            lineHeight: '30px',
            textAlign: 'center',

            backgroundColor: todo.color,
            //border: '2px solid #ccc',
            borderRadius: 3,
            color: (tinycolor(todo.color).getBrightness()>255/2)?'black':'white',
            cursor: 'Pointer',


            boxShadow: 'black 0px 0px 5px';


        }}

        tabIndex="1"
        onMouseEnter={(event)=>{
                event.target.focus();
        }}
        onMouseLeave={(event)=>{
            event.target.blur();
        }}
        onKeyPress={(event)=> {



                if (event.key === 'Enter') {

                    dispatch({type: 'CHANGE_CURRENT_TODO', todo_id: id});

                }else
                if (event.key === 'Delete') {

                    dispatch({type: 'CHANGE_CURRENT_TODO', todo_id: id});
                    dispatch({type: 'DELETE_CURRENT_TODO', todo_id: id});

                }else{
                    console.log(event.key);
                }

            }}


                >{todo.done ? '[FA-done]' : ''}{todo.name}</li>

        </Draggable>
    );

}
