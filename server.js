const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var online = 0;
var users = [];
app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.send("<h1>Ola mundo</h1>");
});

app.use(function (request, result, next) {
	result.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});

let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
