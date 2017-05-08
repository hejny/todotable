
import * as Immutable from "immutable";
import * as Uri from 'jsuri';
//import * as defaultState from '../../../default-state.json';

import {API_URL,DEFAULT_URI} from '../config';


import * as SuperagentPromise from 'superagent-promise';
import * as Superagent from 'superagent';
const superagentPromise = SuperagentPromise(Superagent, Promise);






async function _createStateFromUriCore(uri:string) {
    const uriObject = new Uri(uri);


    const todos_id = uriObject.path().split('/')[1];
    const response = await superagentPromise('GET', `${API_URL}?id=${todos_id}`);
    console.log(response);

    const todos = JSON.parse(response.text);



    let current_todo_id = -1;
    const current_todo_uri = uriObject.path().split('/')[2]||null;
    if(current_todo_uri){

        const current_todo = todos.find((todo)=>todo.uri===current_todo_uri)||null;
        if(current_todo){
            current_todo_id = todos.indexOf(current_todo);
        }else{
            console.warn(`Wrong todo card uri => loading state without opened todo.`);
        }

    }





    return Immutable.fromJS({

        "httpStatus": 200,
        "observer_position": {
            "x": parseFloat(uriObject.getQueryParamValue('x') || 0),
            "y": parseFloat(uriObject.getQueryParamValue('y') || 0)
        },
        "observer_zoom_logarithm": parseFloat(uriObject.getQueryParamValue('zoom') || 0),
        "current_todo_id": current_todo_id,


        resources: [
            {
                key: "Money",
                unit: 'UDS',
                gold: 1,
            },
            {
                key: "Time",
                unit: 'Days',
                gold: 20,
            },

        ],

        //"todos": [],
        "todos": todos,

    });
};







export async function createStateFromUri(uri:string):Immutable{

    try{

        return await _createStateFromUriCore(uri);

    }catch(error){


        console.warn(`Something got wrong => loading state from default uri "${DEFAULT_URI}".`);
        return await _createStateFromUriCore(DEFAULT_URI);

    }


}
