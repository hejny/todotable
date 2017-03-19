
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux'



import {TodoApp} from "../components/todo-app";
import {todoAppReducer} from "../reducers/todo-app-reducer";

import * as _ from "lodash";
import { loadState,saveState } from '../functions/local-storage'
import { createHistoryReducer } from '../functions/create-history-reducer'




export class App{


    private _store;

    constructor(private _container:HTMLElement){


        const defaultState = {

            observer_position:{x:0,y:0},
            current_todo_id: null,


            todos:
            {
                'uuid':{name:'todo',done:true,position:{x:0,y:0}}
            }

        };

        const persistedState = loadState(defaultState);




        this._store = createStore(
            createHistoryReducer(todoAppReducer)
            ,Immutable.fromJS(persistedState)
        );



        this.render();
        this._store.subscribe(this.render.bind(this));

        this._store.subscribe(_.throttle(() => {

            const currentState = this._store.getState().toJS();
            console.log(currentState);

            saveState(currentState);

        },200));


        window.onpopstate = (event) => {
            this._store.dispatch({type:'CHANGE_STATE',state: Immutable.fromJS(event.state)});
        };




    }

    render(){


        const state = this._store.getState().toJS();

        ReactDOM.render(
            <TodoApp state={state} dispatch={this._store.dispatch.bind(this._store)}/>,
            this._container
        );


    }


}