import * as React from "react";


export function TodoCreate(props) {

    const {state, dispatch} = props;


    return (
        <div>
            <input type="text" onChange={(event)=>dispatch({type:'CHANGE_CURRENT_TODO',todo:event.target.value})} value={state.current_todo} />
            <button onClick={dispatch.bind(this,{type:'COMMIT_CURRENT_TODO'})}>Create</button>
        </div>
    );

}
