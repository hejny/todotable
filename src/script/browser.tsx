import * as ReactDOM from "react-dom";


import {App} from './app.tsx';



import {createStateFromUri} from "./uri/create-state-from-uri.ts";
import {createUriFromState} from "./uri/create-uri-from-state.ts";
import {createTitleFromState} from "./uri/create-title-from-state.ts";







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




    app.subscribe(()=>{


        const state = app.getState();

        //todo throttle
        const url =   createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState(state,title,url);


        //------

        console.log('Render...');
        state;
        ReactDOM.render(
            app.createJSX(),
            root
        );


    });



}, true);




