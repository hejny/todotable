
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

//import {INITIAL_APP_STATE} from '../config';
import {getInitialState} from '../resources/initial-state';


import * as Hashes from 'jshashes';
var SHA256 =  new Hashes.SHA256;




export class App{


    private _store;

    constructor(private _container:HTMLElement) {
        this.init();
    }


    async init(){

        const persistedState = await getInitialState();//loadState();


        this._store = createStore(
            createHistoryReducer(
                todoAppReducer
                ,(state)=>{


                    let titleParts = [];

                    if(state.current_todo_id!==-1){
                        titleParts.push(state.todos[state.current_todo_id].name);
                    }

                    titleParts.push('TodoTable.com');
                    titleParts = titleParts.filter((part)=>(part.trim()!==''));

                    return titleParts.join(' | ');



                }
                ,(state)=>{

                    let uriPathParts = [];

                    var SHA1 = SHA256.hex(JSON.stringify(state.todos));
                    uriPathParts.push(SHA1.substring(0,7));


                    if(state.current_todo_id!==-1){
                        uriPathParts.push(state.todos[state.current_todo_id].uri);
                    }


                    const uriPath = '/'+uriPathParts.join('/');



                    return `${uriPath}?x=${state.observer_position.x.toFixed(1)}&y=${state.observer_position.y.toFixed(1)}&zoom=${state.observer_zoom_logarithm.toFixed(1)}`;


                }
                )
            ,Immutable.fromJS(persistedState)
        );



        /*this._store.subscribe(_.throttle(() => {

            const currentState = this._store.getState()
                .toJS();
            saveState(currentState);

        },200));*/



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