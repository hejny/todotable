import * as React from "react";
import {TodoItem} from "./todo-item";



export function TodosList(props){

    const {todos} = props;

    return(
        <ul>
            {todos.map((todo,index)=><TodoItem key={index} name={todo}/>)}
        </ul>
    );

}
