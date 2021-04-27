import express from 'express';
import loginRoute from './login.js';
import signUp from './signup.js';
import products from './products.js';
import user from './user.js';

//Entrypoint routes

const app = express();

//Route login
app.use('', loginRoute);

//Route SignUp
app.use('', signUp);

//Route Products
app.use('', products);

//Route user
app.use('', user);



export default app;