import * as React from "react";


export function TodoCreate(props) {

    const {dispatch} = props;


    return (
        <div>
            <input type="text" />
            <button onClick={()=>dispatch({type:'ADD_TODO',todo:'text'})}>Create</button>
        </div>
    );

}
