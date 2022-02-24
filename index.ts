import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import {HomeRouter} from './routers/home';
import {Application, json, Router, static as expressStatic} from 'express';
import {handlebarHelpers} from "./utils/handlebarHelpers";
import {engine} from "express-handlebars";

const port: number = 3000;
const localhost: string = 'localhost'
const local: string = `Express is listening on http://localhost:${port}`

const app: Application = express();

app.use(json());
app.use(expressStatic('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', new HomeRouter().router);

app.listen(port, localhost, ()=> console.log(local));