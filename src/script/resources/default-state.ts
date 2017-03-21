
import {makeRequest} from './make-request';

export async function getDefaultState(){

    const data = await makeRequest('GET','/api/default-state.json');
    return JSON.parse(data);


}