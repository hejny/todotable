import * as React from "react";
import Style from 'style-it';



import {ColorPicker} from "./color-picker";
import {MarkDownEditor} from "./markdown-editor";


import * as tinycolor from "tinycolor2";




export function TodoEdit(props) {


    const {state, dispatch} = props;


    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {

            dispatch({type: 'CLOSE_CURRENT_TODO'});

        }
    };


    const handleChange = (event) => {
        dispatch({type: 'CHANGE_CURRENT_TODO_KEY', key:'name', value: event.target.value})
    };




    const todoColor = tinycolor(state.todos[state.current_todo_id].color);
    const textColor = tinycolor((todoColor.getBrightness()>255/2)?'black':'white');



    return (
        <Style>

            {`
              .popup-window {
                z-index: 3;
                background-color: ${todoColor.toHexString()};
                color: ${textColor.toHexString()};

                box-shadow: black 0px 0px 5px;
                padding: 10px;

              }
              .popup-window input:focus {
                outline: none;
              }

              .popup-window input::selection {
                background-color: ${textColor.toHexString()};
                color: ${todoColor.toHexString()};
               }


            `}


            <div
                 className="popup-window"
                 onKeyPress={handleKeyPress}

            >


                <input
                    type="text"
                    autoFocus={true}
                    value={state.todos[state.current_todo_id].name}
                    onChange={handleChange}
                    style={{
                  width: '100%',
                  fontSize: '2rem',
                  textAlign: 'center',
                  color: 'inherit',
                  backgroundColor: 'inherit',
                  border: 'none',
                }}
                />


                <ColorPicker

                    value={state.todos[state.current_todo_id].color}
                    onChange={(value)=>dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'color',value:value})}
                />


                <MarkDownEditor
                    value={state.todos[state.current_todo_id].description}
                    onChange={(value)=>dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'description',value:value})}

                />


                <button onClick={dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}>Ok</button>
                <button onClick={dispatch.bind(this,{type:'DELETE_CURRENT_TODO'})}>Delete</button>
                <button onClick={dispatch.bind(this,{type:'TOGGLE_CURRENT_TODO_DONE'})}>Finished</button>


            </div>
        </Style>
    );


}
