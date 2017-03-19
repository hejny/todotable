import * as React from "react";



export function TodoItem(props){

    const {todo, id, dispatch} = props;

    return(
        <li style={{
            color: todo.done?'#ccc':'black'
        }}
        onClick={dispatch.bind(dispatch,{type:'TOGGLE_TODO_DONE',id:id})}
        >{todo.name}</li>
    );

}
