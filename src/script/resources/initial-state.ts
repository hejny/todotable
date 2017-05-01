//todo remove this fi;e

import {API_URL} from '../config';
import {makeRequest} from './make-request';

import * as Uri from 'jsuri';


export async function getInitialState(){


    try{


        const uri = new Uri(location.toString());


        const todos_id = uri.path().split('/')[1];


        const todos = JSON.parse(await makeRequest('GET',`${API_URL}?id=${todos_id}`));

        return {
            "observer_position":{
                "x":parseFloat(uri.getQueryParamValue('x')||0),
                "y":parseFloat(uri.getQueryParamValue('y')||0)
            },
            "observer_zoom_logarithm":parseFloat(uri.getQueryParamValue('zoom')||0),
            "current_todo_id":-1,


            "todos":todos
        };


    }catch(error){

        console.warn('Something got wrong => loading state from default-state.json.');
        return JSON.parse(await makeRequest('GET',`/default-state.json`));

    }



}