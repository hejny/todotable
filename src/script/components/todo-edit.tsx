import * as React from "react";
import Style from 'style-it';
import * as FontAwesome from 'react-fontawesome';


import {ColorPicker} from "./color-picker";
import {MarkDownEditor} from "./markdown-editor";


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
                 className="popup-window todo-edit"
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


              <div className="resources segment">
                  <div className="inputs">
                      <h2>Inputs</h2>
                      <ul>

                          {stateJS.resources.map((resource)=>{

                              //onChange={(event)=>store.dispatch({type:'CHANGE_RESOURCE_NAME',oldName:key,newName:event.target.value})}

                              return(
                                  <li key={resource.key}>

                                      <label>
                                          <span className="resource">
                                              <span className="key">{resource.key}</span>
                                              <span className="unit">[{resource.unit}]</span>
                                          </span>
                                          <input
                                              type="number"
                                              value={stateJS.todos[stateJS.current_todo_id].inputs[resource.key]||0} onChange={(event)=>store.dispatch({type:'CHANGE_CURRENT_TODO_INPUT',resource:resource.key,value:event.target.value})}
                                          />
                                      </label>
                                  </li>
                              );

                          })}


                      </ul>

                  </div>

                  <div className="outputs">
                      <h2>Outputs</h2>
                      <ul>
                          <li>
                              <input value="USD"/>
                              <input value="1800"/>
                          </li>
                          <li>
                              <input value="Time"/>
                              <input value="60"/>
                          </li>

                      </ul>

                  </div>


              </div>





                <div className="done-times segment">
                    <h2>Done times</h2>
                    <table>
                        <thead>
                            <tr>
                                <td>Time</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            stateJS.todos[stateJS.current_todo_id].done_times.map(
                                (done_time,index)=>
                                    <tr key={index}>
                                        <td>{moment(done_time).calendar()}</td>
                                        <td>
                                            <div onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_DELETE_DONE_TIME',index})}>
                                                <FontAwesome name='trash-o' />
                                            </div>
                                        </td>
                                    </tr>
                                )
                        }


                        </tbody>
                    </table>
                </div>




                <div className="editor segment">
                    <MarkDownEditor
                        value={stateJS.todos[stateJS.current_todo_id].description}
                        onChange={(value)=>store.dispatch({type:'CHANGE_CURRENT_TODO_KEY',key:'description',value:value})}

                    />
                </div>



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

                    <button onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_ADD_DONE_TIME',date:new Date()})}><FontAwesome name="check-square-o" /> Done</button>
                    <button onClick={store.dispatch.bind(this,{type:'DELETE_CURRENT_TODO'})}><FontAwesome name='trash-o' /> Delete</button>

                </div>





            </div>
        </Style>
    );


}
