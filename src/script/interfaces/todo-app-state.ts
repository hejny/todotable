
import {ICoords} from './coords';


export interface ITodo{
    name: string;
    color: string;
    done: boolean;
    position:ICoords;
    zIndex:number;
}



export interface ITodoAppState{

    observer_position:ICoords,
    observer_zoom_logarithm:number,
    current_todo_id: string,

    //todo todos:ITodo[];


}