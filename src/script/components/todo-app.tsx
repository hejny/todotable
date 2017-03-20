import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoEdit} from "./todo-edit";


import Style from 'style-it';


interface ITodoAppProps {
    state:{
        todos:string[]
        current_todo_id: string
    }
    dispatch():void
}




export function TodoApp(props:ITodoAppProps) {


    const {state, dispatch} = props;


    return (


        <Style>
            {`

                ul.todo-list li{
                    box-shadow: rgba(0,0,0,0.5) 0 0 5px;
                }

                ul.todo-list li:focus {
                    outline: none;
                    box-shadow: rgba(0,0,0,0.8) 0 0 7px;
                    z-index: 99999999!important;
                }

            `}
            <div style={{
            //overflow:'hidden'
        }}

                 onWheel={(event)=>{
           dispatch({type:'OBSERVER_ZOOM_LOGARITHM_BY',delta:event.deltaY>0?-.1:.1});
        }}
            >


                <TodosList state={state} dispatch={dispatch}/>


                {state.current_todo_id ?<div style={{

            //border: '1px solid blue';

            position: 'absolute',
            zIndex: 2,
            width: '100%',
            height: '100%',
            top:0,
            left:0,

        }}
        onClick={dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}


                ></div>: ''}
                {state.current_todo_id ?<TodoEdit state={state} dispatch={dispatch}/>: ''}

            </div>
        </Style>
    );

}
