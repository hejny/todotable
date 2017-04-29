
import * as Immutable from "immutable";


//var rp = require('request-promise');





//todo async
export async function createStateFromUri(uri:string):Immutable{


    return(Immutable.fromJS({
        "observer_position":{
            "x":0,
            "y":0
        },
        "observer_zoom_logarithm":0,
        "current_todo_id":-1,
        "todos":[]
    }));


}
