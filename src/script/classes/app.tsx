
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux';




import {TodoApp} from "../components/todo-app";
import {todoAppReducer} from "../reducers/todo-app-reducer";

import * as _ from "lodash";
import { loadState,saveState } from '../functions/local-storage'
import { createHistoryReducer } from '../functions/create-history-reducer'

import {INITIAL_APP_STATE} from '../config';




export class App{


    private _store;

    constructor(private _container:HTMLElement){



        const persistedState = loadState(INITIAL_APP_STATE);




        this._store = createStore(
            createHistoryReducer(
                todoAppReducer
                ,(state)=>{


                    let titleParts = [];

                    if(state.current_todo_id){
                        titleParts.push(state.todos[state.current_todo_id].name);
                    }

                    titleParts.push('TodoTable.com');
                    titleParts = titleParts.filter((part)=>(part.trim()!==''));

                    return titleParts.join(' | ');



                }
                ,(state)=>{return '#'+state.current_todo_id}
                )
            ,Immutable.fromJS(persistedState)
        );



        this._store.subscribe(_.throttle(() => {

            const currentState = this._store.getState()
                .toJS();
            saveState(currentState);

        },200));



        window.onpopstate = (event) => {
            this._store.dispatch({type:'CHANGE_STATE',state: Immutable.fromJS(event.state)});
        };




        this.render();
        this._store.subscribe(this.render.bind(this));



    }

    render(){


        const state = this._store.getState().toJS();

        ReactDOM.render(
            <TodoApp state={state} dispatch={this._store.dispatch.bind(this._store)}/>,
            this._container
        );


    }

}