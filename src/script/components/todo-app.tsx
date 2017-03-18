import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoCreate} from "./todo-create";



export function TodoApp(){


    return(
        <div>

            <h1>TodoTableApp</h1>

            <TodosList todos={['Todo1','Todo2','Todo3','Todo4','Todo5']}/>
            <TodoCreate/>

        </div>
    );

}
