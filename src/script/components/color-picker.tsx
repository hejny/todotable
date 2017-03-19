import * as React from "react";


export function ColorPicker(props) {

    let {onChange, value} = props;

    return (
        <div>
            {
                ['#fff','#f00','#00f'].map(
                    (color)=>

                        <div style={{

                            display: 'inline-block',
                            width: value===color?36:40,
                            height: value===color?36:40,

                            backgroundColor: color

                            border: value===color?'2px solid black':'none',
                        }}

                        onClick={onChange.bind(this,color)}
                        >

                        </div>


                )
            }
        </div>
    );

}
