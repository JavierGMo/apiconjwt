/**
 * *****
 * Puerto
 * *****
 */
process.env.PORT = process.env.PORT || 3000;


/**
 * Entorno
 * 
 * 
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Config base de datos mysql
process.env.HOST = process.env.HOST || 'localhost';
process.env.USER = process.env.USER || 'root';
process.env.PASSWORD = '';
// process.env.PASSWORD = process.env.PASSWORD || '';
process.env.DATABASE = process.env.DATABASE || 'dbadminjwt';