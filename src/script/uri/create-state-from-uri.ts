
import * as Immutable from "immutable";


import * as SuperagentPromise from 'superagent-promise';
import * as Superagent from 'superagent';

const superagentPromise = SuperagentPromise(Superagent, Promise);






//todo async
export async function createStateFromUri(uri:string):Immutable{


    const response = await superagentPromise('GET', '/default-state.json');
    const defaultState = JSON.parse(response.text);
    return(Immutable.fromJS(defaultState));


}
