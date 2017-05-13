import * as React from "react";
import * as FontAwesome from 'react-fontawesome';



export function TodoEditResources(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();




    const lastDoneTime = stateJS.todos[stateJS.current_todo_id].done_times.reduce((done_time,latest)=>done_time>latest?done_time:latest,0);
    const s = Math.floor(((new Date()/1) - lastDoneTime)/1000);
    const m = Math.floor(s/60);
    const h = Math.floor(s/60);
    const d = Math.floor(s/24);




    return (
        <div>
            {['inputs','outputs'].map((direction)=>(
                <div className={direction}>
                    <h2>Inputs</h2>
                    <ul>

                        {stateJS.resources.map((resource)=>{

                            //onChange={(event)=>store.dispatch({type:'CHANGE_RESOURCE_NAME',oldName:key,newName:event.target.value})}

                            const expression = stateJS.todos[stateJS.current_todo_id][direction][resource.key]||0;
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
                                            value={expression} onChange={(event)=>store.dispatch({type:'TODO_CHANGE_RESOURCE',todo_id: stateJS.current_todo_id,direction,resource:resource.key,value:event.target.value})}
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
