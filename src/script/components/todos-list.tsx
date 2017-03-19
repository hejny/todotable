import * as React from "react";
import {TodoItem} from "./todo-item";



export function TodosList(props){

    const {state, dispatch} = props;

    return(
        <ul>
            {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} id={todoKey} todo={state.todos[todoKey]} dispatch={dispatch}/>)}
        </ul>
    );

}
