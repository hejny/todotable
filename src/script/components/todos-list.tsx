import * as React from "react";
import {TodoItem} from "./todo-item";



export function TodosList(props){

    const {state} = props;

    return(
        <ul>
            {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} todo={state.todos[todoKey]}/>)}
        </ul>
    );

}
