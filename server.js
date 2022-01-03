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
io.on("connection", function (socket) {
	console.log("User connected: ",  socket.id);

	socket.on("user_connected", function (nome) {
		users[nome] = socket.id;
		io.emit("user_connected", nome);
	});

	socket.on("send_message", function (data) {
		//var socketId = users[data.receiver_id];
         users[data.receiver_id];
    	io.emit("message_received", data);
		
	});

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

    })


let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
