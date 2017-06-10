import * as React from "react";
import * as _ from "lodash";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";
import * as tinycolor from "tinycolor2";



import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';
import {countLastDoneFromTodo,countPeriodFromTodo,countNextDoneFromTodo,countPercentsFromTodo} from '../functions/count-from-todo';

import {EMPTY_TODO} from '../config';



class Cell{
    constructor(public value:number|string,public display){
    }
}



export function TodosTable(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();


    const totalPages = Math.ceil(stateJS.todos.length/stateJS.onpage);

    const currentSelectedTodos = stateJS.todos
        .map((todo,index)=> {


            let lastDoneCell;
            let nextDoneCell;
            let percentsCell;


            const lastDone = countLastDoneFromTodo(todo);
            if (lastDone) {


                const nextDone = countNextDoneFromTodo(todo);
                const percents = countPercentsFromTodo(todo,new Date());


                lastDoneCell = new Cell(lastDone,moment(lastDone).calendar());
                nextDoneCell = new Cell(nextDone,moment(nextDone).fromNow());
                percentsCell = new Cell(percents,Math.round(percents*100*100)/100+'%');

            } else {

                lastDoneCell = new Cell(0,'Never');
                nextDoneCell = new Cell(0,'');
                percentsCell = new Cell(0,'');

            }



            return ({
                index,
                color: todo.color,
                name: new Cell(todo.name,todo.name),
                last_done: lastDoneCell,
                next_done: nextDoneCell,
                percents: percentsCell,
            });




        })
        .sort((a,b)=>(

            (a[stateJS.sort_by].value>b[stateJS.sort_by].value?1:-1)*
            (stateJS.sort_direction==='ascending'?1:-1)

        ))
        //.slice(stateJS.page*stateJS.onpage,stateJS.page*stateJS.onpage + stateJS.onpage);




    return (

        <div className="todo-table">


            {/*<h1>TodoTable.com</h1>*/}



            <table>
                <thead>
                    <tr>
                        <th>#</th>

                        {['name','last_done','next_done','percents'].map((header)=>(

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
                            backgroundColor: todo.color,
                            color: (tinycolor(todo.color).getBrightness()>255/2)?'black':'white',
                        }}>
                            {current_index+1}
                        </td>

                        <td>{todo.name.display}</td>
                        <td>{todo.last_done.display}</td>
                        <td>{todo.next_done.display}</td>
                        <td>{todo.percents.display}</td>


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
