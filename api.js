'use strict';
const express = require("express");
const mysql = require('mysql');
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'escuela'
};

// Create a MySQL pool
var pool = mysql.createConnection(config);
// Export the pool
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb', extended: true }));
var cors = require('cors');
app.use(cors());



pool.connect(function(err) {

    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + pool.threadId);

});

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

//modificar usuario *
app.put('/modifysuer', (req, res)  => {
  
    let usuario = {
        ID : '',
        nombre : ''
       };

       console.log(req.body);

    if(!req.body.ID) {
        var  respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'Usuario original requerido'
        };
        res.send(respuesta);

       } else {


var uptname = 0;

            usuario = {
                ID : req.body.ID,
                nombre : req.body.nombre
             };

        if(usuario.nombre != ""){

            pool.query('UPDATE alumno  SET nombre = ? WHERE ID = ?', [usuario.nombre, usuario.ID], function (error, result, fields){
                if(error!= null){
                    uptname = -1;
                }else{
                    console.log("nombre upt");
                    uptname = 1;
                    var respuesta2 = {
                        error: false,
                        codigo: 200,
                        mensaje: 'Usuario actualizado',
                        update: usuario.ID
                   };
                   console.log(respuesta2);
                   res.send(respuesta2);
                }
            } );
        }
 

        
       }

});



//listener de nuestra API
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });