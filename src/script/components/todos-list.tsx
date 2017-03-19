import * as React from "react";
import * as Draggable from "react-draggable";

import {TodoItem} from "./todo-item";



export function TodosList(props) {

    const {state, dispatch} = props;
    let moved;


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

                    dispatch({type:'OBSERVER_MOVE_BY',position:{x:-object.x,y:-object.y}});
                    //onStop(event,object);

                }else{

                    console.log(event);


                    const position = {
                        x: state.observer_position.x + event.offsetX - event.target.offsetWidth/2,
                        y: state.observer_position.y + event.offsetY - event.target.offsetHeight/2,
                    };

                    const todo = {
                        name:'Click!',
                        done:false,
                        position: position
                    };


                    dispatch({type:'CREATE_NEW_TODO',todo: todo});

                    //dispatch({type:'TOGGLE_TODO_DONE',id:id});
                }

            }}
            className=""

        >


            <ul style={{

            border: '1px solid blue',


            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
            top:0,
            left:0,

        }}

            >
                {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} id={todoKey}
                                                                   todo={state.todos[todoKey]} state={state} dispatch={dispatch}/>)}
            </ul>

        </Draggable>
    );

}
