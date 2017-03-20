
import {ICoords} from '../interfaces/coords'
import {ITodoAppState} from '../interfaces/todo-app-state'




export function countZoomMultiplier(state){
    return Math.pow(2, state.observer_zoom_logarithm);
}



function isometricOperation(coordss:ICoords[],manipulator:(...coord:number[]) => number):ICoords{


    const coordXs = coordss.map((coords)=>coords.x);
    const coordYs = coordss.map((coords)=>coords.y);

    return {
        x: manipulator(...coordXs),
        y: manipulator(...coordYs)
    };

}





export function screenCoordsToRealCoords(screenCoords:ICoords,state:ITodoAppState):ICoords{


    const zoom_multiplier = countZoomMultiplier(state);


    return isometricOperation([screenCoords,state.observer_position],(screenCoord,observerCoord)=>{

        return screenCoord/zoom_multiplier+observerCoord;
    });

}




export function realCoordsToscreenCoords(realCoords:ICoords,state:ITodoAppState):ICoords{

    const zoom_multiplier = countZoomMultiplier(state);

    return isometricOperation([realCoords,state.observer_position],(realCoord,observerCoord)=>{

        return ( realCoord - observerCoord ) * zoom_multiplier;
    });

}