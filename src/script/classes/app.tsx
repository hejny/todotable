
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {TodoApp} from "../components/todo-app";



export class App{


    private _state;

    constructor(private _container:HTMLElement){


        this._state = {
          todos: ['Todo1','Todo2','Todo3','Todo4','Todo5','TodoFromState']
        };

        this.render();

    }

    render(){


        ReactDOM.render(
            <TodoApp state={this._state}/>,
            this._container
        );


    }


}