import * as React from "react";

import {ColorPicker} from "./color-picker";



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


            zIndex: 2,
            backgroundColor: state.todos[state.current_todo_id].color,



            /*border: '1px solid green',


            position: 'absolute',

            width: 200,
            height: 400,
            top:'50%',
            left:'50%',*/



        }}

        className="popup-window"
        >


            <input
                type="text"
                value={state.todos[state.current_todo_id].name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}


            />

            <ColorPicker

                value={state.todos[state.current_todo_id].color}
                onChange={(value)=>dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'color',value:value})}
            />





            <button onClick={dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}>Ok</button>
            <button onClick={dispatch.bind(this,{type:'DELETE_CURRENT_TODO'})}>Delete</button>
            <button onClick={dispatch.bind(this,{type:'TOGGLE_CURRENT_TODO_DONE'})}>Finished</button>



        </div>
    );


}
