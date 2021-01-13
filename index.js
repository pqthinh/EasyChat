const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
})

io.on('connection', (socket) => {
    // console.log(socket.id)
    console.log(`id ${socket.id} connected`);
    
    socket.on('user', (user) => {
        io.emit('user', user);
        console.log(user);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', JSON.stringify(msg));
        console.log(`${socket.id} send message: ` + JSON.stringify(msg));
    });

    socket.on('disconnect', () => {
        console.log(`id ${socket.id} disconnected`);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
