//Crear la conexión
var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emitir eventos

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing', handle.value);
});

//Esperando eventos
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML +='<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p id="typing"><em>    ' + data + ' está escribiendo...</em></p>';
});