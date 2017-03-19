
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux'



import {TodoApp} from "../components/todo-app";
import {todoAppReducer} from "../reducers/todo-app-reducer";

import * as _ from "lodash";
import { loadState,saveState } from '../functions/local-storage'




export class App{


    private _store;

    constructor(private _container:HTMLElement){


        const defaultState = {

            current_todo: {name:'Do not procrastinate!',done:false},
            todos:
            {
                'uuid':{name:'todo',done:true}
            }

        };

        const persistedState = loadState(defaultState);




        this._store = createStore(
            todoAppReducer
            ,Immutable.fromJS(persistedState)
        );




        this.render();
        this._store.subscribe(this.render.bind(this));

        this._store.subscribe(_.throttle(() => {

            const currentState = this._store.getState().toJS();
            console.log(currentState);

            saveState(currentState);

        },200));



    }

    render(){


        const state = this._store.getState().toJS();

        ReactDOM.render(
            <TodoApp state={state} dispatch={this._store.dispatch.bind(this._store)}/>,
            this._container
        );


    }


}