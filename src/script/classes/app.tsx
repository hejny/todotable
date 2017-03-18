
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {TodoApp} from "../components/todo-app";



export class App{


    constructor(private _container:HTMLElement){

        this.render();
    }

    render(){


        ReactDOM.render(
            <TodoApp/>,
            this._container
        );


    }


}