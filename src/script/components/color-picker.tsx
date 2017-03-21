import * as React from "react";


const COLORS = [
    '#EF2D56',
    '#732C2C',
    '#420C14',
    '#ED7D3A',
    '#8CD867',
    '#2FBF71',
    '#797270',
    '#453F3C',
    '#62929E',
    '#4A6D7C',
    '#54577C',
    '#731DD8',
];


export function ColorPicker(props) {

    let {onChange, value} = props;

    return (
        <div style={{
            width:'100%',
            //perspective: 500,
            //perspectiveOrigin: 'center center',
            //boxShadow: 'black 0px 0px 5px';


        }}>
            {
                COLORS.map(
                    (color)=>

                        <div style={{

                            display: 'inline-block',
                            width: 100/COLORS.length+'%',
                            height: 20,

                            backgroundColor: color,

                            boxShadow: value===color?'inset 0px 0px 5px black':'none',

                        }}

                            key={color}
                            onClick={onChange.bind(this,color)}
                        >

                        </div>


                )
            }
        </div>
    );

}
