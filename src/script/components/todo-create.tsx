import * as React from "react";


export function TodoCreate(props) {

    const {state, dispatch} = props;



    const handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            dispatch({type:'COMMIT_CURRENT_TODO'});
        }
    };



    return (
        <div>
            <input type="text" onChange={(event)=>dispatch({type:'CHANGE_CURRENT_TODO_NAME',todo: event.target.value})} value={state.current_todo.name} onKeyPress={handleKeyPress} />
            <button onClick={dispatch.bind(this,{type:'COMMIT_CURRENT_TODO'})}>Create</button>
        </div>
    );

}
