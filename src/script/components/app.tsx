import * as React from "react";
import {TodosList} from "./todos-list";
import {TodoCreate} from "./todo-create";



export function App(){


    return(
        <div>

            <h1>TodoTableApp</h1>

            <TodosList/>
            <TodoCreate/>

        </div>
    );

}
