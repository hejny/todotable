import * as React from "react";
import * as Draggable from "react-draggable";

import {TodosBoardItem} from "./todos-board-item";

import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';


import {EMPTY_TODO} from '../config';


export function TodosBoard(props) {

    const {store} = props;
    const stateJS = store.getState().toJS();


    var moved;

    var mouseRealCoords;


    const zoom_multiplier = countZoomMultiplier(stateJS);
    const backgroundImageBlockSize = 700*zoom_multiplier;
    const backgroundImageBlockLeft = -stateJS.observer_position.x*zoom_multiplier;
    const backgroundImageBlockTop  = -stateJS.observer_position.y*zoom_multiplier;




    return (
        <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',

            overflow: 'hidden',
        }}>
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

                    //onStop(event,object);

                }else{


                    //polyfill
                    if(event instanceof TouchEvent){
                        event.offsetX = event.changedTouches[0].pageX - event.target.offsetLeft;
                        event.offsetY = event.changedTouches[0].pageY - event.target.offsetTop;
                    }


                    const realCoords = screenCoordsToRealCoords({
                        x:event.offsetX - event.target.offsetWidth/2,
                        y:event.offsetY - event.target.offsetHeight/2
                    },stateJS);

                    /*const position = {
                        x: state.observer_position.x + event.offsetX - event.target.offsetWidth/2,
                        y: state.observer_position.y + event.offsetY - event.target.offsetHeight/2,
                    };*/


                    const todo = Object.assign({},EMPTY_TODO,{
                        position: realCoords
                    });


                    store.dispatch({type:'CREATE_NEW_TODO',todo: todo});




                }

            }}
            className=""

        >


            <ul className="todo-list" style={{

            //border: '1px solid blue',


            position: 'absolute',
            zIndex: 1,
            width: '300%',
            height: '300%',
            top:'-100%',
            left:'-100%',




            //backgroundImage: 'url("/media/images/backgrounds/graph-paper.svg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_WoodPlanksOld0255_2_seamless_S.jpg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_WoodStudded0044_1_seamless_S.jpg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_ConcreteBare0350_1_seamless_S.jpg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_ConcreteBare0433_11_seamless_S.jpg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_MetalBare0234_1_seamless_S.jpg")',
            backgroundImage: 'url("/media/images/backgrounds/whiteboard.jpg")',
            //backgroundImage: 'url("/media/images/backgrounds/TexturesCom_WoodFine0059_11_seamless_S.jpg")',


            backgroundRepeat: 'repeat, repeat',
            backgroundSize: `${backgroundImageBlockSize}px, ${backgroundImageBlockSize}px`,
            backgroundPosition: `calc(${backgroundImageBlockLeft}px + 50%) calc(${backgroundImageBlockTop}px + 50%)`,



            //filter: stateJS.current_todo_id!==-1?'blur(2px)':'',


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
                onKeyPress={(event)=> {
                event.stopPropagation();
                event.preventDefault();

                     if (event.key === 'Enter') {
                    } else if (event.key === 'Delete') {
                    } else {

                        if(typeof mouseRealCoords === 'undefined'){
                            throw new Error('I dont know position.');
                        }

                        const todo = Object.assign({},EMPTY_TODO,{
                            position: mouseRealCoords,
                            name: event.key
                        });

                        store.dispatch({type:'CREATE_NEW_TODO',todo: todo});
                        //dispatch({type:'CLOSE_CURRENT_TODO'});

                    }

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
