import * as React from "react";



export function TodoItem(props){

    const {todo} = props;

    return(
        <li style={{
            color: todo.done?'#ccc':'black'
        }}>{todo.name}</li>
    );

}
