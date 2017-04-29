import * as Immutable from "immutable";
import {WEB_NAME,TITLE_SEPARATOR} from "../config.ts";


export async function createTitleFromState(state:Immutable):string{

    const stateJS = state.toJS();

    let titleParts = [];

    if(stateJS.current_todo_id!==-1){
        titleParts.push(stateJS.todos[stateJS.current_todo_id].name);
    }

    titleParts.push(WEB_NAME);
    titleParts = titleParts.filter((part)=>(part.trim()!==''));

    return titleParts.join(TITLE_SEPARATOR);



}
