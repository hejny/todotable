import * as ReactDOM from "react-dom";


import {App} from './app.tsx';



import {createStateFromUri} from "./uri/create-state-from-uri.ts";
import {createUriFromState} from "./uri/create-uri-from-state.ts";
import {createTitleFromState} from "./uri/create-title-from-state.ts";
import {async} from "ts-promise/dist/lib/async";







window.addEventListener('load', function() {




    const root = document.getElementById('root');
    const app = new App();




    createStateFromUri(window.location.pathname)
        .then((state)=>{

            app.setState(state);

            console.log('First render...');
            ReactDOM.render(
                app.createJSX(),
                root
            );




        });




    window.onpopstate = (event) => {
        app.setState(event.state);
    };







    //todo throttle
    app.subscribe(async function(){


        const state = app.getState();


        //todo use await* in future
        const [uri, title] = await Promise.all([createUriFromState(state) , createTitleFromState(state)]);


        document.title = title;
        history.pushState(state,title,uri);


        //------

        console.log('Render...');
        state;
        ReactDOM.render(
            app.createJSX(),
            root
        );


    });











}, true);




