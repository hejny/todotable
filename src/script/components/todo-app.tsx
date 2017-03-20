import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoEdit} from "./todo-edit";



interface ITodoAppProps {
    state:{
        todos:string[]
        current_todo_id: string
    }
    dispatch():void
}




export function TodoApp(props:ITodoAppProps){


    const {state,dispatch} = props;


    return(
        <div style={{
            //overflow:'hidden'
        }}>

            {/*<h1>TodoTableApp</h1>*/}

            <TodosList state={state} dispatch={dispatch}/>
            {state.current_todo_id?<div style={{

            //border: '1px solid blue';

            position: 'absolute',
            zIndex: 2,
            width: '100%',
            height: '100%',
            top:0,
            left:0,

        }}
            onClick={dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}

        ></div>:''}
            {state.current_todo_id?<TodoEdit state={state} dispatch={dispatch}/>:''}

        </div>
    );

}
