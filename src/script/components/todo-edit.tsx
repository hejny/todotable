import * as React from "react";
import Style from 'style-it';
import * as FontAwesome from 'react-fontawesome';


import {ColorPicker} from "./color-picker";
import {MarkDownEditor} from "./markdown-editor";
import {TodoEditResources} from "./todo-edit-resources";
import {TodoEditDoneTimes} from "./todo-edit-done-times";


import * as tinycolor from "tinycolor2";



//todo separate file
function mapObject(object:Object,callback:(string,any)=>any){
    let mappedArray = [];
    for(let key in object){
        mappedArray.push(callback(key,object[key]));
    }
    return mappedArray;
}




export function TodoEdit(props) {


    const {store} = props;
    const stateJS = store.getState().toJS();


    /*
    let outputs = [];
    let inputs  = [];
    //todo ?reducer
    stateJS.todos.forEach((todo)=>{

        outputs.concat(todo.outputs.keys());
        inputs.concat(todo.inputs.keys());

    });*/






    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {

            store.dispatch({type: 'CURRENT_TODO_CLOSE'});

        }
    };


    const handleChange = (event) => {
        store.dispatch({type: 'TODO_CHANGE_KEY',todo_id: stateJS.current_todo_id, key:'name', value: event.target.value})
    };




    const todoColor = tinycolor(stateJS.todos[stateJS.current_todo_id].color);
    const textColor = tinycolor((todoColor.getBrightness()>255/2)?'black':'white');





    return (
        <Style>

            {`
              .popup-window {

                background-color: ${todoColor.toHexString()};
                color: ${textColor.toHexString()};
              }


              .popup-window input::selection {
                background-color: ${textColor.toHexString()};
                color: ${todoColor.toHexString()};
               }


            `}


            <div
                 className="popup-window todo-edit"
                 onKeyPress={handleKeyPress}

            >




                <input
                    type="text"
                    autoFocus={true}
                    defaultValue={stateJS.todos[stateJS.current_todo_id].name}
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
                    onChange={(value)=>store.dispatch({type:'TODO_CHANGE_KEY',todo_id: stateJS.current_todo_id,key:'color',value:value})}
                />




                <div className="editor segment">
                    <MarkDownEditor
                        value={stateJS.todos[stateJS.current_todo_id].description}
                        onChange={(value)=>store.dispatch({type:'TODO_CHANGE_KEY',todo_id: stateJS.current_todo_id,key:'description',value:value})}

                    />
                </div>
                <div className="done-times segment">
                    <TodoEditResources store={store} />
                </div>
                <div className="resources segment">
                    <TodoEditDoneTimes  store={store} />
                </div>





                <div style={{
                        //float:'right',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        margin: 5,

                    }}>
                    {/*<button onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_CLOSE'})}><FontAwesome name='rocket' /></button>*/}



                    <button onClick={store.dispatch.bind(this,{type:'TODO_TOGGLE_WIDTH',todo_id: stateJS.current_todo_id})}>
                        <FontAwesome name="text-width" />{' '}
                        {stateJS.todos[stateJS.current_todo_id].width==-1?'auto':stateJS.todos[stateJS.current_todo_id].width+'px'}
                    </button>

                    <button onClick={store.dispatch.bind(this,{type:'TODO_ADD_DONE_TIME',todo_id: stateJS.current_todo_id,date:new Date()})}><FontAwesome name="check-square-o" /> Done</button>
                    <button onClick={store.dispatch.bind(this,{type:'TODO_DELETE',todo_id: stateJS.current_todo_id})}><FontAwesome name='trash-o' /> Delete</button>

                </div>





            </div>
        </Style>
    );


}
