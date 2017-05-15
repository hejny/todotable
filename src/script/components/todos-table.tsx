import * as React from "react";
import * as _ from "lodash";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";
import * as tinycolor from "tinycolor2";



import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';
import {countLastDoneFromTodo,countInOutFromTodo} from '../functions/count-from-todo';

import {EMPTY_TODO} from '../config';


export function TodosTable(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();


    const totalPages = Math.ceil(stateJS.todos.length/stateJS.onpage);

    const currentSelectedTodos = stateJS.todos
        .map((todo,index)=>{

            const inOut = countInOutFromTodo(todo,stateJS.resources);

            return _.defaults({},todo,{
                index,
                input: inOut.i,
                output: inOut.o,
                oi: inOut.o-inOut.i,
            });






        })
        .sort((a,b)=>(

            (a[stateJS.sort_by]>b[stateJS.sort_by]?1:-1)*
            (stateJS.sort_direction==='ascending'?1:-1)

        ))
        //.slice(stateJS.page*stateJS.onpage,stateJS.page*stateJS.onpage + stateJS.onpage);


    //console.log(currentSelectedTodos);


    const primary_resource = stateJS.resources.find((resource)=>resource.primary);


    return (

        <div className="todo-table">


            {/*<h1>TodoTable.com</h1>*/}



            <table>
                <thead>
                    <tr>
                        <th>#</th>

                        {['name','last_done','input','output','oi'].map((header)=>(

                            <th
                                key={header}
                                onClick={()=>store.dispatch({type:'TABLE_VIEW_SORT_BY',sort_by: header})}>
                                {header} {stateJS.sort_by===header?(stateJS.sort_direction==='ascending'?<FontAwesome name="sort-asc"/>:<FontAwesome name="sort-desc"/>):''}
                            </th>

                        ))}


                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {currentSelectedTodos.map((todo,current_index)=>(



                    <tr
                        key = {todo.index}
                        onClick={()=>store.dispatch({type:'CURRENT_TODO_SELECT',todo_id:todo.index})}
                        style={{
                            //backgroundColor: todo.color
                        }}

                    >


                        <td style={{
                            backgroundColor: todo.color
                             color: (tinycolor(todo.color).getBrightness()>255/2)?'black':'white',
                        }}>
                            {current_index+1}
                        </td>

                        <td>
                            {todo.name}
                        </td>

                        <td>
                            {(()=>{


                                const lastDone = countLastDoneFromTodo(todo);

                                if(lastDone)
                                    return moment(lastDone).calendar();
                                else
                                    return 'Never';

                            })()}
                        </td>

                        <td>
                            {todo.input}&nbsp;{primary_resource.unit}
                        </td>
                        <td>
                            {todo.output}&nbsp;{primary_resource.unit}
                        </td>
                        <td>
                            {todo.oi}&nbsp;{primary_resource.unit}
                        </td>

                        <td>
                            <ul>
                                <li className="clickable" onClick={(e)=>{e.stopPropagation();store.dispatch({type:'TODO_ADD_DONE_TIME',todo_id:todo.index,date:new Date()})}}><FontAwesome name="check"/>Done</li>
                                <li className="clickable" onClick={(e)=>{e.stopPropagation();store.dispatch({type:'TODO_DELETE',todo_id:todo.index})}}><FontAwesome name="trash"/>Delete</li>
                            </ul>

                        </td>




                    </tr>

                ))}
                </tbody>
            </table>

            <button onClick={()=>store.dispatch({type:'TODO_CREATE',todo: EMPTY_TODO})}> <FontAwesome name="plus" />Add</button>



            {/*<div className="todos-table-pagination">
                <ul>


                    {stateJS.page>0?<li onClick={()=>store.dispatch({type:'TABLE_VIEW_CHANGE_PAGE',page: stateJS.page-1})}>Previous</li>:''}
                    <li>Page {stateJS.page+1}/{totalPages}</li>
                    {stateJS.page+1<totalPages?<li onClick={()=>store.dispatch({type:'TABLE_VIEW_CHANGE_PAGE',page: stateJS.page+1})}>Next</li>:''}


                </ul>
            </div>*/}





        </div>

    );

}
