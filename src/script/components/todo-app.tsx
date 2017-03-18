import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoCreate} from "./todo-create";



export function TodoApp(props:{state:{todos:string[]}}){


    const {todos} = props.state;


    return(
        <div>

            <h1>TodoTableApp</h1>

            <TodosList todos={todos}/>
            <TodoCreate/>

        </div>
    );

}
