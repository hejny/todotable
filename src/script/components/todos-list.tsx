import * as React from "react";
import * as Draggable from "react-draggable";

import {TodoItem} from "./todo-item";

import {screenCoordsToRealCoords,countZoomMultiplier} from '../functions/coords';

import {INITIAL_TODO} from '../config';


export function TodosList(props) {

    const {state, dispatch} = props;
    var moved;

    var mouseRealCoords;


    const zoom_multiplier = countZoomMultiplier(state);
    const backgroundImageBlockSize = 50*zoom_multiplier;
    const backgroundImageBlockLeft = -state.observer_position.x*zoom_multiplier;
    const backgroundImageBlockTop  = -state.observer_position.y*zoom_multiplier;




    return (
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

                    dispatch({type:'OBSERVER_MOVE_BY',position:{x:-object.x/zoom_multiplier,y:-object.y/zoom_multiplier}});

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
                    },state);

                    /*const position = {
                        x: state.observer_position.x + event.offsetX - event.target.offsetWidth/2,
                        y: state.observer_position.y + event.offsetY - event.target.offsetHeight/2,
                    };*/


                    const todo = Object.assign({},INITIAL_TODO,{
                        position: realCoords
                    });


                    dispatch({type:'CREATE_NEW_TODO',todo: todo});




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



            filter: state.current_todo_id!==-1?'blur(5px)':'',


        }}


            onMouseMove={(event)=> {
                mouseRealCoords = screenCoordsToRealCoords({
                    x:event.nativeEvent.offsetX - event.target.offsetWidth/2,
                    y:event.nativeEvent.offsetY - event.target.offsetHeight/2
                },state);
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

                        const todo = Object.assign({},INITIAL_TODO,{
                            position: mouseRealCoords,
                            name: event.key
                        });

                        dispatch({type:'CREATE_NEW_TODO',todo: todo});
                        //dispatch({type:'CLOSE_CURRENT_TODO'});

                    }

            }}


            >
                {Object.keys(state.todos).map((todoKey)=><TodoItem key={todoKey} id={todoKey}
                                                                   todo={state.todos[todoKey]} state={state}
                                                                   dispatch={dispatch}/>)}
            </ul>

        </Draggable>

    );

}
