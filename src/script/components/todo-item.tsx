import * as React from "react";



export function TodoItem(props){

    const {name} = props;

    return(
        <li>{name}</li>
    );

}
