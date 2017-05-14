import * as React from "react";

import * as FontAwesome from 'react-fontawesome';

import {TodosBoard} from "./todos-board.tsx";
import {TodosTable} from "./todos-table.tsx";
import {TodoEdit} from "./todo-edit.tsx";
import {Resources} from "./resources.tsx";


import Style from 'style-it';
import {EMPTY_TODO} from "../config.ts";




interface ITodoAppProps {
    state:{
        todos:string[]
        current_todo_id: number
    }
    dispatch():void
}




export function TodoApp(props:ITodoAppProps) {


    const {store} = props;
    const stateJS = store.getState().toJS();



    return (
        <div className="todo-app">



            <div className="select-view">
                <ul>
                    <li onClick={()=>store.dispatch({'type':'VIEW_CHANGE',view:'table'})} className={stateJS.view==='table'?'selected':''}>TodoTable</li>
                    <li onClick={()=>store.dispatch({'type':'VIEW_CHANGE',view:'resources'})} className={stateJS.resources==='table'?'selected':''}>Resources</li>
                </ul>
            </div>







            {stateJS.view==='table'?<TodosTable store={store}/>:''}
            {stateJS.view==='resources'?<Resources store={store}/>:''}






            <div
                className="add-todo"
                onClick={()=>store.dispatch({type:'TODO_CREATE',todo: EMPTY_TODO})}
            >
                <FontAwesome name="plus" />
            </div>



            {stateJS.current_todo_id!==-1 ?<div style={{

        //border: '1px solid blue';

        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        top:0,
        left:0,
        backgroundColor: 'rgba(255,255,255,0.5)',

    }}
    onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_CLOSE'})}


            ></div>: ''}
            {stateJS.current_todo_id!==-1 ?<TodoEdit store={store}/>: ''}




        </div>

    );

}
