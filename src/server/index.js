const app = require('express')();

const http = require('http').Server(app);

const io = module.exports.io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

const socektManger = require('./scoketManger');

io.on('connection', socektManger);

app.listen(PORT, _ => { console.log(`listen on port ${PORT}`); })