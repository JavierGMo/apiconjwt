import './config/config.js';
import cors from 'cors';
import express, { urlencoded, json } from 'express';
import routes from './routes/index.js';

const app = express();

app.use(cors());

//Parse application application/x-www-form-urlencoded
app.use(urlencoded({
    extended : false
}));




//Para application/json
app.use(json());


//Configuracion de las rutas
app.use(routes);
// app.use('/login', routesLogin);

//Aqui va la configuracion de la base de datos


app.listen(process.env.PORT, function(){
    console.log('Server runnig...');
});