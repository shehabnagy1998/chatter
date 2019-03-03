const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const io = module.exports.io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const socektManger = require('./socketManger');

app.use(express.static(path.join(__dirname, '../../build')));
app.use(cors());

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'))
})

io.on('connection', socektManger);

http.listen(PORT, _ => { console.log(`listen on port ${PORT}`); })