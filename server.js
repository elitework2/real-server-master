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
		//socket.to(socketId).emit("message_received", data);

		//connection.query("INSERT INTO user_chat (sender_id, receiver_id, message) VALUES ('" + data.sender_id + "', '" + data.receiver_id + "', '" + data.message + "')", function (error, result) {
			//
		//});
	});
});
	
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });


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


let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
