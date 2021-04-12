import mysql from 'mysql2/promise';
import '../config/config.js';
//Conexion a la base de datos

async function getConnection(){
    const connection = await mysql.createConnection({
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    });

    return connection;
}

export default getConnection;