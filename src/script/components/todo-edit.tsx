import * as React from "react";



export function TodoEdit(props) {


    const {state, dispatch} = props;



    const handleKeyPress = (event) => {
        if(event.key == 'Enter'){

            dispatch({type:'CLOSE_CURRENT_TODO'});

        }
    };


    const handleChange = (event) => {
        dispatch({type:'CHANGE_CURRENT_TODO_NAME',todo_name: event.target.value})
    };




    return (
        <div style={{

            border: '1px solid green',


            position: 'absolute',
            zIndex: 2,
            width: 100,
            height: 100,
            top:'50%',
            left:'50%',



        }}>
            <input
                type="text"
                value={state.todos[state.current_todo_id].name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}


            />
            <button onClick={dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}>Ok</button>
            <button onClick={dispatch.bind(this,{type:'DELETE_CURRENT_TODO'})}>Delete</button>
            <button onClick={dispatch.bind(this,{type:'TOGGLE_CURRENT_TODO_DONE'})}>Finished</button>



        </div>
    );


}
