
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux';




import {TodoApp} from "./components/todo-app";
import {stateReducer} from "./reducers/state-reducer";

import * as _ from "lodash";
import { loadState,saveState } from './functions/local-storage'
import { createHistoryReducer } from './functions/create-history-reducer'
import {wrapReducer} from './functions/wrap-reducer';


//import {INITIAL_APP_STATE} from '../config';
import {getInitialState} from './resources/initial-state';


import * as Hashes from 'jshashes';
var SHA256 =  new Hashes.SHA256;



















export class App{

    private _store;
    private _stateInitialized;
    private _subscribers;

    constructor() {
        this._subscribers = [];
        this._stateInitialized = false;
    }

    _stateInitializedCheck(){
        if(!this._stateInitialized){
            throw new Error(`State was not set yet.`);
        }
    }


    setState(state: Immutable){

        this._store = createStore(
            wrapReducer(stateReducer)
            //todo backward compatibility
            ,state
        );
        this._store.subscribe(this._triggerSubscribers.bind(this));
        this._stateInitialized = true;

    }


    getState(){
        this._stateInitializedCheck();
        return this._store.getState();
    }


    subscribe(subscriberCallback){
        this._subscribers.push(subscriberCallback);
    }

    _triggerSubscribers(){
        this._subscribers.forEach((subscriberCallback)=>{
            subscriberCallback();
        });

    }

    createJSX(){

        this._stateInitializedCheck();
        //todo rename to TodoComponent
        return <TodoApp store={this._store}/>;
    }

}







/*




export class App{


    private _store;

    constructor(private _container:HTMLElement) {
        this.init();
    }


    async init(){

        const persistedState = await getInitialState();//loadState();


        this._store = createStore(
            createHistoryReducer(


                wrapReducer(stateReducer)
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

/**/