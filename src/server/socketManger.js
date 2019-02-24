const io = require('./index').io;

module.exports = function (socket) {
    console.log(`socket id is ${socket.id}`);
}