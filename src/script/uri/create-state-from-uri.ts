
import * as Immutable from "immutable";
import * as _ from "lodash";
import * as Uri from 'jsuri';
import {EMPTY_TODO} from '../config';
//import * as defaultState from '../../../default-state.json';

import {API_URL,DEFAULT_URI} from '../config';


import * as SuperagentPromise from 'superagent-promise';
import * as Superagent from 'superagent';
const superagentPromise = SuperagentPromise(Superagent, Promise);






async function _createStateFromUriCore(uri:string) {
    const uriObject = new Uri(uri);


    const todos_id = uriObject.path().split('/')[1];
    const response = await superagentPromise('GET', `${API_URL}?id=${todos_id}`);
    //console.log(response);



    const responseJson = JSON.parse(response.text);


    const todos = responseJson.todos.map((todo)=>_.defaults({},todo,EMPTY_TODO));








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



    //console.log(uri);
    //console.log(uriObject);
    //console.log(uriObject.getQueryParamValue('view'));


    return Immutable.fromJS({

        "httpStatus": 200,
        "observer_position": {
            "x": parseFloat(uriObject.getQueryParamValue('x') || 0),
            "y": parseFloat(uriObject.getQueryParamValue('y') || 0)
        },
        "observer_zoom_logarithm": parseFloat(uriObject.getQueryParamValue('zoom') || 0),

        "sort_by": uriObject.getQueryParamValue('sort_by') || 'io',
        "sort_direction": uriObject.getQueryParamValue('sort_direction') || 'ascending',
        "view": uriObject.getQueryParamValue('view') || 'table',
        //"page": uriObject.getQueryParamValue('page') || 0,
        //"onpage": uriObject.getQueryParamValue('onpage') || 10,

        "current_todo_id": current_todo_id,


        //resources: responseJson.resources,




        //"todos": [],
        "todos": todos,

    });
};







export async function createStateFromUri(uri:string):Immutable{

    try{

        return await _createStateFromUriCore(uri);

    }catch(error){



        return(Immutable.fromJS({

            httpStatus: 200,
            observer_position: {x:0,y:0},
            observer_zoom_logarithm: 0,
            sort_by: 'percents',
            sort_direction: 'ascending',
            view:  'table',
            current_todo_id: -1,
            todos: [],

        }));

        //console.warn(`Something got wrong => loading state from default uri "${DEFAULT_URI}".`);
        //return await _createStateFromUriCore(DEFAULT_URI);

    }


}
