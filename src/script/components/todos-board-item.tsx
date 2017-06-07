import * as React from "react";
import * as Draggable from "react-draggable";
import * as FontAwesome from 'react-fontawesome';
import * as ReactMarkdown from "react-markdown";


import * as tinycolor from "tinycolor2";

import {realCoordsToScreenCoords,screenCoordsToRealCoords} from '../functions/coords';


export function TodosBoardItem(props) {

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





    const position = realCoordsToScreenCoords({x:0,y:0}, state);


    const width = ((todo.width || -1) > 0) ? todo.width : Math.max(todo.name.length * 10 + 30, 100);







    return (


        <li style={{
            position: 'absolute',
            left: `calc( 50% - ${width/2}px + ${position.x}px )`,
            top: `calc(50%  + ${position.y}px )`,
            //transition: `top 1s, left 1s`,
            //transitionTimingFunction: `linear`,

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

                        store.dispatch({type: 'CURRENT_TODO_SELECT', todo_id: id});

                    } else if (event.key === 'Delete') {

                        store.dispatch({type: 'CURRENT_TODO_SELECT', todo_id: id});
                        store.dispatch({type: 'DELETE_CURRENT_TODO', todo_id: id});

                    } else {

                        store.dispatch({type: 'CURRENT_TODO_SELECT', todo_id: id});
                        store.dispatch({type: 'CHANGE_CURRENT_TODO_KEY', key: 'name', value: todo.name + event.key});
                        store.dispatch({type: 'CURRENT_TODO_CLOSE', todo_id: id});

                        console.log(event.key);
                    }

                }}

            onClick={()=>store.dispatch({type:'CURRENT_TODO_SELECT',todo_id:id})}



        >
            {todo.done ? <FontAwesome name="check-square-o"/>  : ''}
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




    );

}
