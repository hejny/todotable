import * as React from "react";
import {TodoItem} from "./todo-item";



export function TodosList(props){

    const {state} = props;

    return(
        <ul>
            {state.todos.map((todo,index)=><TodoItem key={index} todo={todo}/>)}
        </ul>
    );

}
