import * as React from "react";
import {TodoItem} from "./todo-item";



export function TodosList(){


    return(
        <ul>
            <TodoItem name="Todo1"/>
            <TodoItem name="Todo2"/>
            <TodoItem name="Todo3"/>
            <TodoItem name="Todo4"/>


        </ul>
    );

}
