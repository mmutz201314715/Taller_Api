'use strict';
const express = require("express");
const mysql = require('mysql');
const config = {
    host: '10.150.0.2',
    user: 'root',
    password: '123',
    database: 'escuela',
};
// Create a MySQL pool
const pool = mysql.createPool(config);
// Export the pool
module.exports = pool;
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());

// Display all alumnos
app.get('/alumno', (request, response) => {
    let datos = [];
    pool.query('SELECT * FROM alumno', (error, results) => {
        if (error) throw error;
 
        results.forEach(result => {
            console.log(result);
            datos.push(result);
        });
        response.send(datos);
    });
});



//listener de nuestra API
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });