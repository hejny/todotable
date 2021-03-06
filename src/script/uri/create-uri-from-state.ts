import * as Immutable from "immutable";
import * as Hashes from 'jshashes';
const SHA256 =  new Hashes.SHA256;


import {API_URL} from '../config';
//import {makeRequest} from '../resources/make-request';

import * as SuperagentPromise from 'superagent-promise';
import * as Superagent from 'superagent';
const superagentPromise = SuperagentPromise(Superagent, Promise);




//todo this function should persist the state
export async function createUriFromState(state:Immutable):string {



    console.log('createUriFromState');
    const stateJS = state.toJS();



    let uriPathParts = [];


    const syncState = {
            todos:stateJS.todos,
            resources:stateJS.resources
    };



    //await makeRequest('POST', API_URL, JSON.stringify(syncState), {'Content-Type': 'application/json'});
    await superagentPromise.post( API_URL, syncState);



    var SHA1 = SHA256.hex(JSON.stringify(syncState));
    uriPathParts.push(SHA1.substring(0, 7));


    if (stateJS.current_todo_id !== -1) {
        uriPathParts.push(stateJS.todos[stateJS.current_todo_id].uri);
    }


    const uriPath = '/' + uriPathParts.join('/');


    return `${uriPath}?view=${stateJS.view}&sort_by=${stateJS.sort_by}&sort_direction=${stateJS.sort_direction}`;
    //&onpage=${stateJS.onpage}&page=${stateJS.page}
    //x=${stateJS.observer_position.x.toFixed(1)}&y=${stateJS.observer_position.y.toFixed(1)}&zoom=${stateJS.observer_zoom_logarithm.toFixed(1)}


}
