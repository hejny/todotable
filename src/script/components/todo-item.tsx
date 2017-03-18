import * as React from "react";



export function TodoItem(props){

    let {name} = props;

    return(
        <li>{name}</li>
    );

}
