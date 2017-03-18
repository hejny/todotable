
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "../components/app";



export class App{


    constructor(private _container:HTMLElement){

        this.render();
    }

    render(){


        ReactDOM.render(
            <App/>,
            this._container
        );


    }




}