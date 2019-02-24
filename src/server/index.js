const http = require('http').createServer();

const io = module.exports.io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

const socektManger = require('./socketManger');

io.on('connection', socektManger);

http.listen(PORT, _ => { console.log(`listen on port ${PORT}`); })