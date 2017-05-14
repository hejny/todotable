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
                                <input defaultValue={resource.key} onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'key',value:e.target.value})}/>
                            </td>
                            <td>
                                <input defaultValue={resource.unit} onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'unit',value:e.target.value})}/>
                            </td>
                            <td>
                                <input defaultValue={resource.ratio} type="number" onChange={(e)=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_key:resource.key,'key':'ratio',value:e.target.value})}/>
                                {primary_resource.unit}
                            </td>
                            <td>
                                {resource.primary?'':
                                    <ul>
                                        <li onClick={()=>store.dispatch({type:'RESOURCE_DELETE',resource_id})}>Delete
                                        </li>
                                        <li onClick={()=>store.dispatch({type:'RESOURCE_CHANGE_KEY',resource_id,'key':'primary',value:true})}>
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
