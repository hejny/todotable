import * as React from "react";
import Style from 'style-it';
import * as FontAwesome from 'react-fontawesome';


import {ColorPicker} from "./color-picker";
import {MarkDownEditor} from "./markdown-editor";


import * as tinycolor from "tinycolor2";




export function TodoEdit(props) {


    const {store} = props;
    const stateJS = store.getState().toJS();


    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {

            store.dispatch({type: 'CLOSE_CURRENT_TODO'});

        }
    };


    const handleChange = (event) => {
        store.dispatch({type: 'CHANGE_CURRENT_TODO_KEY', key:'name', value: event.target.value})
    };




    const todoColor = tinycolor(stateJS.todos[stateJS.current_todo_id].color);
    const textColor = tinycolor((todoColor.getBrightness()>255/2)?'black':'white');



    return (
        <Style>

            {`
              .popup-window {
                z-index: 3;
                background-color: ${todoColor.toHexString()};
                color: ${textColor.toHexString()};

                box-shadow: black 0px 0px 15px;
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
                    value={stateJS.todos[stateJS.current_todo_id].name}
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

                    value={stateJS.todos[stateJS.current_todo_id].color}
                    onChange={(value)=>store.dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'color',value:value})}
                />





              {/*<iframe src="/donate.html"></iframe>*/}



                <MarkDownEditor
                    value={stateJS.todos[stateJS.current_todo_id].description}
                    onChange={(value)=>store.dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'description',value:value})}

                />



                <div style={{
                        //float:'right',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        margin: 5,

                    }}>
                    {/*<button onClick={store.dispatch.bind(this,{type:'CLOSE_CURRENT_TODO'})}><FontAwesome name='rocket' /></button>*/}



                    <button onClick={store.dispatch.bind(this,{type:'TOGGLE_CURRENT_TODO_WIDTH'})}>
                        <FontAwesome name="text-width" />{' '}
                        {stateJS.todos[stateJS.current_todo_id].width==-1?'auto':stateJS.todos[stateJS.current_todo_id].width+'px'}
                    </button>

                    <button onClick={store.dispatch.bind(this,{type:'TOGGLE_CURRENT_TODO_DONE'})}><FontAwesome name={(stateJS.todos[stateJS.current_todo_id].done?'check-square-o':'square-o')} /> Done</button>
                    <button onClick={store.dispatch.bind(this,{type:'DELETE_CURRENT_TODO'})}><FontAwesome name='trash-o' /> Delete</button>

                </div>





            </div>
        </Style>
    );


}
