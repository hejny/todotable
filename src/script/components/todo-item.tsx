import * as React from "react";



export function TodoItem(props){

    const {todo, id, dispatch} = props;

    return(
        <li style={{
            listStyle: 'none',
            width: 100,
            height: 30,
            backgroundColor: todo.done?'#0f0':'#00f',
            border: '2px solid #ccc',
            borderRadius: 3,
            color: 'white',
            cursor: 'Pointer',


        }}
        onClick={dispatch.bind(dispatch,{type:'TOGGLE_TODO_DONE',id:id})}
        >{todo.name}</li>
    );

}
