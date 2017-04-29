import * as React from "react";
import * as Draggable from "react-draggable";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";

import * as tinycolor from "tinycolor2";

import {realCoordsToScreenCoords,screenCoordsToRealCoords} from '../functions/coords';


export function TodoItem(props) {

    const {todo, id, state, store} = props;

    let moved;


    /*const position = {
     x: todo.position.x - state.observer_position.x,
     y: todo.position.y - state.observer_position.y
     };

     const zoom_multiplier = Math.pow(2,state.observer_zoom_logarithm);
     const position_zoom = {
     x: position.x * zoom_multiplier,
     y: position.y * zoom_multiplier,
     };*/

    const position = realCoordsToScreenCoords(todo.position, state);


    const width = ((todo.width||-1)>0)?todo.width:Math.max(todo.name.length*10+30,100);



    return (
        <Draggable

            position={position}


            onStart={(event)=>{

                event.stopPropagation();
                event.preventDefault();
                moved = false;
            }}
            onDrag={(event)=>{
                event.preventDefault();
                moved = true;
            }}
            onStop={(event,object) => {

                event.stopPropagation();
                event.preventDefault();

                store.dispatch({type:'SELECT_CURRENT_TODO',todo_id:id});

                if(moved){
                    store.dispatch({type:'MOVE_CURRENT_TODO_TO_FRONT'});
                    store.dispatch({type:'MOVE_TODO',id:id,position:screenCoordsToRealCoords(object,state)});
                    store.dispatch({type:'CLOSE_CURRENT_TODO'});
                }


        }}


            className=""

        >


            <li style={{
            position: 'absolute',
            top: '50%',
            left: `calc( 50% - ${width/2}px )`,


            padding: 5,


            listStyle: 'none',
            width: width,
            minHeight: 30,
            //lineHeight: '30px',
            textAlign: 'center',
            overflow: 'hidden',

            backgroundColor: todo.color,
            //border: '2px solid #ccc',
            borderRadius: 3,
            color: (tinycolor(todo.color).getBrightness()>255/2)?'black':'white',
            cursor: 'Pointer',

            opacity: todo.done?.4:1,

            zIndex: todo.zIndex,



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
                    event.target.parentElement.focus();
                }}
                onKeyPress={(event)=> {

                    event.stopPropagation();
                    event.preventDefault();

                    if (event.key === 'Enter') {

                        store.dispatch({type: 'SELECT_CURRENT_TODO', todo_id: id});

                    } else if (event.key === 'Delete') {

                        store.dispatch({type: 'SELECT_CURRENT_TODO', todo_id: id});
                        store.dispatch({type: 'DELETE_CURRENT_TODO', todo_id: id});

                    } else {

                        store.dispatch({type: 'SELECT_CURRENT_TODO', todo_id: id});
                        store.dispatch({type: 'CHANGE_CURRENT_TODO_KEY', key: 'name', value: todo.name + event.key});
                        store.dispatch({type: 'CLOSE_CURRENT_TODO', todo_id: id});

                        console.log(event.key);
                    }

                }}


            >
                {todo.done ? <FontAwesome name="check-square-o" />  : ''}
                <h1 style={{
                    fontSize: '1.1rem',
                    margin: 4,
                    padding: 0,
                }}>
                    {todo.name}
                </h1>

                <ReactMarkdown
                    source={(()=>{


                        const descriptionParts = todo.description.split('---');

                        if(descriptionParts.length>1){
                            return descriptionParts[0]+'\n...';
                        }else{
                            return todo.description;
                        }



                    })()}


                    renderers={{Link: props => <a href={props.href} target="_blank" onClick={(e)=>{e.stopPropagation();}}>{props.children}</a>}}

                />




            </li>


        </Draggable>

    );

}
