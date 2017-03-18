
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";





export class App{


    constructor(private _container:HTMLElement){

        this.render();
    }

    render(){


        ReactDOM.render(
            <p>TodoTableApp</p>,
            this._container
        );


    }




}