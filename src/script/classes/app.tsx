
//import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";





export class App{


    constructor(private _container:HTMLElement){

        this.render();
    }

    render(){


        ReactDOM.render(
            <div>

                <h1>TodoTableApp</h1>


                <ul>
                    <li>Todo1</li>
                    <li>Todo2</li>
                    <li>Todo3</li>
                    <li>Todo4</li>
                </ul>


                <div>
                    <input type="text" />
                    <button>Create</button>
                </div>





            </div>,
            this._container
        );


    }




}