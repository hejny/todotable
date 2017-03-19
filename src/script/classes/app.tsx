
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux'



import {TodoApp} from "../components/todo-app";
import {todoAppReducer} from "../reducers/todo-app-reducer";



export class App{


    private _store;

    constructor(private _container:HTMLElement){


        const defaultState = Immutable.fromJS({

            current_todo: {name:'Do not procrastinate!',done:false},
            todos: [{name:'todo',done:true}]

        });



        this._store = createStore(
            todoAppReducer
            ,defaultState
        );




        this.render();
        this._store.subscribe(this.render.bind(this));

    }

    render(){


        const state = this._store.getState().toJS();
        console.log(state);

        ReactDOM.render(
            <TodoApp state={state} dispatch={this._store.dispatch.bind(this._store)}/>,
            this._container
        );


    }


}