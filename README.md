# API con JWT

## Instalar dependencias 

`npm install`

## NODEMON
 Se necesita nodemon, se instala con los siguientes comandos: 
- Global: `npm i -g nodemon`
- Dependencia de desarrollo: `npm i --save-dev nodemon`



## Base de datos
Esta API se conecta con MySQL asi que deben tener instalado este para poder usar esta API.
Cambia la configuracion de tu usuario y contraseña que esta en la siguiente ruta del proyecto: config/config.js

La base de datos esta en la carpeta de dbsql/, la puedes importar en phpmyadmin o puedes editar el archivo e importalo, depende de lo que requieras.

## Importante: BD

Esta base de datos solo tiene dos tablas, pero talvez pueda crecer, los campos si van a cambiar ya que faltan agregar mas campos en ambas tablas, pero, por ahora es funcional sin ningun problema. :D

## Correr el proyecto en local:

`npm run dev`

