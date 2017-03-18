
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
          todos: ['Todo1','Todo2','Todo3','Todo4','Todo5','TodoFromStore']
        });



        this._store = createStore(
            todoAppReducer
            ,defaultState
        );



        /*setInterval(()=>{
            this._store.dispatch({type:'ADD_TODO',todo:'Do not procrastinate!'});
        },1000);*/


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