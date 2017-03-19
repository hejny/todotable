import * as React from "react";



export function TodoCreate(props) {


    const {state, dispatch} = props;



    const handleKeyPress = (event) => {
        if(event.key == 'Enter'){

            dispatch({type:'COMMIT_CURRENT_TODO'});

        }
    };


    const handleChange = (event) => {
        dispatch({type:'CHANGE_CURRENT_TODO_NAME',todo: event.target.value})
    };




    return (
        <div>
            <input
                type="text"
                value={state.current_todo.name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}


            />
            <button onClick={dispatch.bind(this,{type:'COMMIT_CURRENT_TODO'})}>Create</button>
        </div>
    );

}
