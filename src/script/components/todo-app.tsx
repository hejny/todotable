import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoCreate} from "./todo-create";



export function TodoApp(props:{state:{todos:string[]}}){


    const {state,dispatch} = props;


    return(
        <div style={{
            //overflow:'hidden'
        }}>

            <h1>TodoTableApp</h1>

            <TodosList state={state} dispatch={dispatch}/>
            <TodoCreate state={state} dispatch={dispatch}/>

        </div>
    );

}
