var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'Bot -ivanmerida'
}];

io.on('connection', function(socket){
    console.log('El cliente con IP: ' + socket.handshake.address+' se ha conectado...');
    socket.emit('messages', messages); // muestra el mensaje a todos los clientes
    // recoge un evento
    socket.on('add-message', function(data) {
        messages.push(data); // agregamos un nuevo dato al array
        io.sockets.emit('messages',messages); // volver a actualizar el array
    });
});

server.listen(6677, function () {
    console.log('Servidor está funcionando en http://localhost:6677');
    console.log('Para conectarte desde otro dispositivo usa http://+IP del computador:6677');
});
