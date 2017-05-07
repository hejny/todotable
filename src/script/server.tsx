

import * as path from 'path';
import * as express from 'express';
import * as ReactDOMServer from 'react-dom/server';


global.window = {};


//console.log(express);
var expressApp = express();


//Static content
expressApp.use('/media', express.static('./media/'));
expressApp.use('/dist', express.static('./dist/'));



/*expressApp.get('/dist/*', function (req, res) {
    res.send('aaa');
});*/




import {App} from "./app.tsx";
import {createStateFromUri} from "./uri/create-state-from-uri.ts";
import {createUriFromState} from "./uri/create-uri-from-state.ts";
import {createTitleFromState} from "./uri/create-title-from-state.ts";


import * as fs from 'fs';
import * as util from 'util';
import * as html from "html";
import {async} from "ts-promise/dist/lib/async";





//console.log(__dirname);
//console.log(path.join(__dirname, '../index.html'));


const indexHtml = fs.readFileSync('./index.html', 'utf8');
//const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
//const stats = fs.statSync(path.join(''));
//const mtime = new Date(util.inspect(stats.mtime));



//Build at ${mtime.toString()}
const buildInfo = `
        (cc) Pavol Hejný
        https://github.com/hejny/todotable
        Process started at ${(new Date()).toString()}
    `;






async function getRouterAsync(req, res) {

    console.log(`GET "${req.originalUrl}"`);

    const app = new App();


    const state = await createStateFromUri(req.originalUrl);


    if (state.get('httpStatus') === 200) {


        const normalizedUri = await createUriFromState(state);
        if (req.originalUrl !== normalizedUri) {

            console.log(`Redirect "${normalizedUri}"`);
            res.redirect(301, normalizedUri);
            return;
        }
    }


    res.status(state.get('httpStatus'));
    app.setState(state);


    const title = await createTitleFromState(state);
    const rootHtml = ReactDOMServer.renderToStaticMarkup(app.createJSX());




    const outHtml = indexHtml
            .split('<!--title-->').join(title)
            .split('<!--root-->').join(rootHtml)
            .split('browser.js').join('browser.min.js')
        ;
    //const outHtmlPretty = outHtml;
    const outHtmlPretty = html.prettyPrint(outHtml, {indent_size: 4});


    const outHtmlPrettyWithInfo = outHtmlPretty
        .split('<!--build-info-->').join(`<!--${buildInfo}-->`);


    res.send(outHtmlPrettyWithInfo);


}




expressApp.get('/*', function (req, res) {

    getRouterAsync(req, res)
        .then(()=>{

        })
        .catch((error)=>{

            res.status(500);
            console.error(error);
            console.log(error.stack);

        }).then(()=>{

            res.end();

        });



});



 /**/


app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function () {
    console.log(`App listening on port ${app.get('port')}!`)
});