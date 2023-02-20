var express = require('express');
var socket = require('socket.io');

//Setup de la aplicación
var app = express();
var servidor = app.listen(4000,function(){
    console.log('Atendiendo peticiones del puerto 4000');

});

//Archivos estáticos
app.use(express.static('public'));

//Setup del socket
var io = socket(servidor);

io.on('connection', function(socket){
    console.log('Conexión de socket lograda', socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing', data);
    });
});