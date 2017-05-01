
import * as Immutable from "immutable";
import * as Uri from 'jsuri';
import * as defaultState from '../../../default-state.json';

import {API_URL} from '../config';


//import * as SuperagentPromise from 'superagent-promise';
//import * as Superagent from 'superagent';
//const superagentPromise = SuperagentPromise(Superagent, Promise);





export async function createStateFromUri(uri:string):Immutable{


    try{


        const uriObject = new Uri(uri);


        //const todos_id = uriObject.path().split('/')[1];
        //const todos = JSON.parse(await makeRequest('GET',`${API_URL}?id=${todos_id}`));

        return Immutable.fromJS({

            "httpStatus": 200,
            "observer_position":{
                "x":parseFloat(uriObject.getQueryParamValue('x')||0),
                "y":parseFloat(uriObject.getQueryParamValue('y')||0)
            },
            "observer_zoom_logarithm":parseFloat(uriObject.getQueryParamValue('zoom')||0),
            "current_todo_id":-1,

            "todos": [],
            //"todos":todos,

        });


    }catch(error){

        console.warn('Something got wrong => loading default state.');
        return Immutable.fromJS(defaultState);

    }


}
