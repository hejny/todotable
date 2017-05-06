import * as ReactDOM from "react-dom";


import {App} from './app.tsx';



import {createStateFromUri} from "./uri/create-state-from-uri.ts";
import {createUriFromState} from "./uri/create-uri-from-state.ts";
import {createTitleFromState} from "./uri/create-title-from-state.ts";
//import {async} from "ts-promise/dist/lib/async";



import {API_URL} from './config';
import {makeRequest} from './resources/make-request';






window.addEventListener('load', function() {




    const loadingElement = document.getElementById('loading');
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







    //todo throttle  import * as _ from "lodash";
    app.subscribe(async function(){


        const state = app.getState();






        console.log(loadingElement);


        ReactDOM.render(
            <div>aaa</div>,
            loadingElement
        );
        makeRequest('POST', API_URL, JSON.stringify(state.get('todos').toJS()), {'Content-Type': 'application/json'})
            .then((response)=>{
                ReactDOM.render(
                    <div>success</div>,
                    loadingElement
                );
            })
            .catch((error)=>{
                ReactDOM.render(
                    <div>error</div>,
                    loadingElement
                );
            })
        ;







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




