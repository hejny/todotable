import * as React from "react";
import * as Draggable from "react-draggable";





export function TodoItem(props){

    const {todo, id, dispatch} = props;

    let moved;


    return(
    <Draggable

        position={todo.position}


        onStart={()=>{
                    moved = false;
                }}
        onDrag={()=>{
                    moved = true;
                }}
        onStop={(event,object) => {

                        if(moved){
                            event.preventDefault();
                            dispatch({type:'MOVE_TODO',id:id,position:{x:object.x,y:object.y}});
                            //onStop(event,object);

                        }else{

                            dispatch({type:'TOGGLE_TODO_DONE',id:id});
                        }

                    }}
        className=""

    >

        <li style={{
            position: 'absolute',
            top: 0,
            left: 0,



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
