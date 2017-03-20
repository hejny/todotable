import * as React from "react";
import * as Draggable from "react-draggable";

import * as tinycolor from "tinycolor2";




export function TodoItem(props) {

    const {todo, id, state , dispatch} = props;

    let moved;

    const position = {
        x: todo.position.x - state.observer_position.x,
        y: todo.position.y - state.observer_position.y
    };


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

                    dispatch({type:'MOVE_TODO',id:id,position:{x:object.x + state.observer_position.x,y:object.y + state.observer_position.y}});
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


        }}
            >{todo.done?'[FA-done]':''}{todo.name}</li>

        </Draggable>
    );

}
