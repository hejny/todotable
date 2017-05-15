import * as React from "react";
import * as FontAwesome from 'react-fontawesome';
import {countLastDoneFromTodo,countInOutFromTodo} from '../functions/count-from-todo';


export function TodoEditResources(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();




    let lastDoneTime = stateJS.todos[stateJS.current_todo_id].done_times.reduce((done_time,latest)=>done_time>latest?done_time:latest,0);
    if(lastDoneTime/1==0){
        lastDoneTime=new Date()/1;
    }



    const s = Math.floor(((new Date() / 1) - lastDoneTime) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const w = Math.floor(d / 7);
    const M = Math.floor(d / 30.436875);
    const y = Math.floor(d / 365.2425);
    const _ = w+M+y;//fake usage for compiler



    const inOut = countInOutFromTodo(stateJS.todos[stateJS.current_todo_id],stateJS.resources);
    const primary_resource = stateJS.resources.find((resource)=>resource.primary);


    return (
        <div>
            {['inputs','outputs'].map((direction)=>(
                <div className={direction}>
                    <h2>{direction}</h2>
                    = {inOut[direction==='inputs'?'i':'o']}&nbsp;{primary_resource.unit}

                    <ul>

                        {stateJS.resources.map((resource,resource_id)=>{

                            //onChange={(event)=>store.dispatch({type:'CHANGE_RESOURCE_NAME',oldName:key,newName:event.target.value})}

                            const expression = stateJS.todos[stateJS.current_todo_id][direction][resource_id]||0;
                            let result;
                            try{


                                result = eval(expression);


                            }catch (error){
                                result = 0;
                            }


                            return(
                                <li key={resource.key}>

                                    <label>
                                          <span className="resource">
                                              <span className="key">{resource.key}</span>
                                              <span className="unit">[{resource.unit}]</span>
                                          </span>
                                        <input
                                            type="text"
                                            defaultValue={expression} onChange={(event)=>store.dispatch({type:'TODO_CHANGE_RESOURCE',todo_id: stateJS.current_todo_id,direction,resource_id,value:event.target.value})}
                                        />
                                        ={result}


                                    </label>
                                </li>
                            );

                        })}


                    </ul>

                </div>
            ))}

        </div>
    );

}
