import './config/config.js';
import cors from 'cors';
import express, { urlencoded, json } from 'express';
// import fileUpload from 'express-fileupload';
import busboyBodyParser  from 'busboy-body-parser';
import routes from './routes/index.js';

const app = express();

app.use(cors());
// app.use(fileUpload());
//Parse application application/x-www-form-urlencoded
app.use(urlencoded({
    extended : false
}));

app.use(busboyBodyParser());


//Para application/json
app.use(json());


//Configuracion de las rutas
app.use(routes);
// app.use('/login', routesLogin);

//Aqui va la configuracion de la base de datos


app.listen(process.env.PORT, function(){
    console.log('Server runnig...');
});