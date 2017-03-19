import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoEdit} from "./todo-edit";



export function TodoApp(props:{state:{todos:string[]}}){


    const {state,dispatch} = props;


    return(
        <div style={{
            //overflow:'hidden'
        }}>

            {/*<h1>TodoTableApp</h1>*/}

            <TodosList state={state} dispatch={dispatch}/>
            {state.current_todo_id?<TodoEdit state={state} dispatch={dispatch}/>:''}

        </div>
    );

}
