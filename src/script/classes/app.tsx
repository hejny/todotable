
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux'

import {TodoApp} from "../components/todo-app";
import {todoAppReducer} from "../reducers/todo-app-reducer";



export class App{


    private _store;

    constructor(private _container:HTMLElement){


        const defaultState = {
          todos: ['Todo1','Todo2','Todo3','Todo4','Todo5','TodoFromStore']
        };



        this._store = createStore(
            todoAppReducer
            ,defaultState
        );


        this.render();

    }

    render(){


        const state = this._store.getState();


        ReactDOM.render(
            <TodoApp state={state}/>,
            this._container
        );


    }


}