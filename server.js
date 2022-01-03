const { Socket } = require('dgram');
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.send("<h1>Ola mundo</h1>");
});



let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
