import * as React from "react";

import * as FontAwesome from 'react-fontawesome';

import {TodosBoard} from "./todos-board.tsx";
import {TodosTable} from "./todos-table.tsx";
import {TodoEdit} from "./todo-edit.tsx";


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


        <Style>
            {`

                ul.todo-list:focus {
                    outline: none;
                }

                ul.todo-list > li{
                    box-shadow: rgba(0,0,0,0.5) 0 0 5px;
                }

                ul.todo-list > li:focus {
                    outline: none;
                    box-shadow: rgba(0,0,0,0.8) 0 0 7px;
                    z-index: 99999999!important;
                }

                ul.todo-list > li h3{
                    font-size: 1.1rem;
                }

                a{
                    color: inherit;
                }

            `}
            <div>



                <TodosTable store={store}/>


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
            backgroundColor: 'rgba(255,255,255,0.1)',

        }}
        onClick={store.dispatch.bind(this,{type:'CURRENT_TODO_CLOSE'})}


                ></div>: ''}
                {stateJS.current_todo_id!==-1 ?<TodoEdit store={store}/>: ''}




            </div>
        </Style>
    );

}
