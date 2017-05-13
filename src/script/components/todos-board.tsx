import * as React from "react";
import * as Draggable from "react-draggable";

import {TodosBoardItem} from "./todos-board-item.tsx";

import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';


import {EMPTY_TODO} from '../config';


export function TodosBoard(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();


    var moved;

    var mouseRealCoords;


    const zoom_multiplier = countZoomMultiplier(stateJS);
    const backgroundImageBlockSize = 700 * zoom_multiplier;
    const backgroundImageBlockLeft = -stateJS.observer_position.x * zoom_multiplier;
    const backgroundImageBlockTop = -stateJS.observer_position.y * zoom_multiplier;


    return (

        <div>

            <div
                className="axis"
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    top:'0',
                    left:'0',
                }}
            >
                <svg style={{width:'100vw',height:'100vh'}}>
                    <circle cx={50} cy={50} r={10} fill="red"/>
                    <line x1="0" y1="0" x2="100%" y2="100%" style={{stroke:'rgb(255,0,0)',strokeWidth:2}} />
                </svg>
            </div>





            <Draggable

                position={{x:0,y:0}}


                onStart={(event,object)=>{



                event.stopPropagation();
                event.preventDefault();
                moved = false;

            }}
                onDrag={(event,object)=>{
                event.stopPropagation();
                event.preventDefault();
                moved = true;


            }}
                onStop={(event,object) => {

                event.stopPropagation();
                event.preventDefault();


                if(moved){

                    store.dispatch({type:'OBSERVER_MOVE_BY',position:{x:-object.x/zoom_multiplier,y:-object.y/zoom_multiplier}});


                }

            }}
                className=""

            >


                <ul className="todo-list" style={{

                //border: '1px solid blue',


                position: 'absolute',
                zIndex: 2,
                width: '300%',
                height: '300%',
                top:'-100%',
                left:'-100%',




                /*backgroundImage: 'url("/media/images/backgrounds/whiteboard.jpg")',
                backgroundRepeat: 'repeat, repeat',
                backgroundSize: `${backgroundImageBlockSize}px, ${backgroundImageBlockSize}px`,
                backgroundPosition: `calc(${backgroundImageBlockLeft}px + 50%) calc(${backgroundImageBlockTop}px + 50%)`,*/

            }}


                    onMouseMove={(event)=> {
                    mouseRealCoords = screenCoordsToRealCoords({
                        x:event.nativeEvent.offsetX - event.target.offsetWidth/2,
                        y:event.nativeEvent.offsetY - event.target.offsetHeight/2
                    },stateJS);
                }}


                    tabIndex="1"
                    onMouseEnter={(event)=> {
                    event.stopPropagation();
                    event.preventDefault();
                    event.target.focus();
                }}
                    onMouseLeave={(event)=> {
                    event.stopPropagation();
                    event.preventDefault();
                    event.target.blur();
                }}


                >
                    {Object.keys(stateJS.todos).map((todoKey)=><TodosBoardItem key={todoKey} id={todoKey}
                                                                         todo={stateJS.todos[todoKey]} state={stateJS}
                                                                         store={store}/>)}
                </ul>


            </Draggable>

        </div>

    );

}
