import * as React from "react";
import * as Draggable from "react-draggable";





export function TodoItem(props) {

    const {todo, id, state , dispatch} = props;

    let moved;

    const position = {
        x: todo.position.x + state.list_position.x,
        y: todo.position.y + state.list_position.y
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

                    dispatch({type:'MOVE_TODO',id:id,position:{x:object.x - state.list_position.x,y:object.y - state.list_position.y}});
                    //onStop(event,object);

                }else{

                    dispatch({type:'TOGGLE_TODO_DONE',id:id});
                }

        }}


            className=""

        >

            <li style={{
            position: 'absolute',
            top: '50%',
            left: '50%',



            listStyle: 'none',
            width: 100,
            height: 30,
            backgroundColor: todo.done?'#0f0':'#00f',
            border: '2px solid #ccc',
            borderRadius: 3,
            color: 'white',
            cursor: 'Pointer',


        }}
            >{todo.name}</li>
        </Draggable>
    );

}
