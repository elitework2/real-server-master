
const { Socket } = require('dgram');
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require("body-parser");
const mysql = require("mysql");
//app.use(bodyParser.urlencoded());
const PORT = process.env.PORT || 2500;
var online = 0;
var users = [];
app.use(bodyParser.json());//parser utizado para requisições quando é via post, identificar o json no body, via get não há necessidade
                            // os parametros vem no atributo query
app.use(bodyParser.urlencoded({ extended : true }));

var connection = mysql.createConnection({
	"host": "localhost",
	"user": "root",
	"password": "",
	"database": "messenger"
});

connection.connect(function (error) {
	//
});

app.use(function (request, result, next) {
	result.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.post("/get_messages", function (request, result) {
	connection.query("SELECT * FROM user_chat WHERE (sender_id = '" + request.body.sender_id + "' AND receiver_id = '" + request.body.receiver_id + "') OR (sender_id = '" + request.body.receiver_id + "' AND receiver_id = '" + request.body.sender_id + "')", function (error, messages) {
		result.end(JSON.stringify(messages));
	});
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
		//socket.to(socketId).emit("message_received", data);

		//connection.query("INSERT INTO user_chat (sender_id, receiver_id, message) VALUES ('" + data.sender_id + "', '" + data.receiver_id + "', '" + data.message + "')", function (error, result) {
			//
		//});
	});
});


app.get("/", function(req, res) {
  //  res.sendFile(__dirname + '/index.php');
    res.send("<h1>Ola mundo</h1>");
})




io.on('connection', (socket) => {

online++;

socket.on('newuser', () => {
    io.emit('new', online);
   
    socket.on("user_connected", function (nome) {
		users[nome] = socket.id;
		io.emit("user_connected", nome);
	});

})

socket.on('load', (data) => {
    io.emit('load', data);
   
})

socket.on('typing', (data) => {
    io.emit('receiver_typing', data);
   
})

socket.on('update_last_project', (data) => {
    io.emit('update_last_project', data);
   
})

socket.on('load_offer', (data) => {
    io.emit('load_offer', data);
   
})

socket.on('load_contact_msg', (data) => {
    io.emit('load_contact_msg', data);
   
})

//load_offer

socket.on('disconect', () => {
    online--;
    io.emit('new', online)
})

})

http.listen(PORT, () => {
    console.log('Serveris running on port', PORT)
})



let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
