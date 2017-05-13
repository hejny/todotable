import * as React from "react";
import * as _ from "lodash";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";


import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';
import {countLastDoneFromTodo,countInOutFromTodo} from '../functions/count-from-todo';

import {EMPTY_TODO} from '../config';


export function TodosTable(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();


    const totalPages = Math.ceil(stateJS.todos.length/stateJS.onpage);

    const currentSelectedTodos = stateJS.todos
        .map((todo,index)=>_.defaults({},todo,{index}))
        .sort((a,b)=>(

            (a[stateJS.sort_by]>b[stateJS.sort_by]?1:-1)*
            (stateJS.sort_direction==='ascending'?1:-1)

        ))
        .slice(stateJS.page*stateJS.onpage,stateJS.page*stateJS.onpage + stateJS.onpage);



    return (

        <div className="todo-table">


            <h1>TodoTable.com</h1>



            <table>
                <thead>
                    <tr>
                        <th></th>

                        {['name','last_done','inputs','outputs','oi'].map((header)=>(

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



                    <tr onClick={()=>store.dispatch({type:'CURRENT_TODO_SELECT',todo_id:todo.index})}>


                        <td>
                            {current_index+1+(stateJS.page*stateJS.onpage)}
                        </td>

                        <td>
                            {todo.name}
                        </td>

                        <td>
                            {moment(countLastDoneFromTodo(todo)).calendar()}
                        </td>

                        <td>
                            {countInOutFromTodo(todo,stateJS.resources).i}
                        </td>
                        <td>
                            {countInOutFromTodo(todo,stateJS.resources).o}
                        </td>
                        <td>
                            {countInOutFromTodo(todo,stateJS.resources).o-countInOutFromTodo(todo,stateJS.resources).i}
                        </td>

                        <td>
                            <ul>
                                <li onClick={()=>store.dispatch({type:'TODO_ADD_DONE_TIME',todo_id:todo.index})}>Done</li>
                            </ul>
                            Done | Delete
                        </td>




                    </tr>

                ))}
                </tbody>
            </table>



            <div className="todos-table-pagination">
                <ul>
                    {stateJS.page>0?<li onClick={()=>store.dispatch({type:'TABLE_VIEW_CHANGE_PAGE',page: stateJS.page-1})}>Previous</li>:''}
                    {stateJS.page+1<totalPages?<li onClick={()=>store.dispatch({type:'TABLE_VIEW_CHANGE_PAGE',page: stateJS.page+1})}>Next</li>:''}
                </ul>
            </div>



            <button onClick={()=>store.dispatch({type:'TODO_CREATE',todo: EMPTY_TODO})}> <FontAwesome name="plus" />Add</button>

        </div>

    );

}
