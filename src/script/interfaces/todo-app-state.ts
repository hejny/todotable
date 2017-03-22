
import {ICoords} from './coords';


export interface ITodo{
    name: string;
    description: string;
    uri: string;
    color: string;
    done: boolean;
    position:ICoords;
    zIndex:number;
}



export interface ITodoAppState{

    observer_position:ICoords,
    observer_zoom_logarithm:number,
    current_todo_id: string,

    todos:ITodo[];


}