import * as React from "react";
import * as _ from "lodash";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";
import * as tinycolor from "tinycolor2";

import {EMPTY_RESOURCE} from '../config';



export function Resources(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();

    const primary_resource = stateJS.resources.find((resource)=>resource.primary);



    return (

        <div className="todo-table">


            {/*<h1>TodoTable.com</h1>*/}



            <table>
                <thead>
                <tr>

                    <th></th>
                    <th>Key</th>
                    <th>Unit</th>
                    <th>Ratio</th>
                    <th>Actions</th>


                </tr>
                </thead>
                <tbody>
                {stateJS.resources.map((resource,resource_id)=> {

                    //const used = true;
                    return(
                        <tr key={resource_id}>

                            <td>
                                {resource.primary ?<FontAwesome name="home"/>: ''}
                            </td>
                            <td>
                                <input defaultValue={resource.key} onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'key',value:e.target.value})}/>
                            </td>
                            <td>
                                <input defaultValue={resource.unit} onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'unit',value:e.target.value})}/>
                            </td>
                            <td>

                                {resource.primary?resource.ratio:
                                    <input value={resource.ratio} type="number" onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'ratio',value:e.target.value})}/>
                                }

                                &nbsp;
                                {primary_resource.unit}



                            </td>
                            <td>
                                {resource.primary?'':
                                    <ul>
                                        <li className="clickable" onClick={()=>store.dispatch({type:'RESOURCE_DELETE',resource_id})}>Delete
                                        </li>
                                        <li className="clickable" onClick={()=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'primary',value:true})}>
                                            Set as primary
                                        </li>
                                    </ul>
                                }

                            </td>



                        </tr>
                    );

                })}
                </tbody>
            </table>



            <button onClick={()=>store.dispatch({type:'RESOURCE_CREATE',resource: EMPTY_RESOURCE})}> <FontAwesome name="plus" />Add</button>

        </div>

    );

}
