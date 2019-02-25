const io = require('./index').io;
const uuid = require('uuid/v4');
const { VERIFIY_USER, CREATE_USER, SEND_MESSAGE, RECIVE_MESSAGE, TYPING, RECIVE_TYPING } = require('../CONSTANTS');

let connectedUsers = [];

const isUser = (nickname) => {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].nickname.toLowerCase() === nickname.toLowerCase()) { return true }
    }
    return false
}

module.exports = function (socket) {

    socket.on(VERIFIY_USER, (nickname, callback) => {
        if (isUser(nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({
                isUser: false, user: {
                    id: uuid(),
                    nickname,
                    socketID: socket.id
                }
            })
        }
    });

    socket.on(CREATE_USER, (user, callback) => {
        connectedUsers = [
            ...connectedUsers,
            user
        ];
    });

    socket.on(SEND_MESSAGE, (message) => {
        socket.broadcast.emit(RECIVE_MESSAGE, message)
    });

    socket.on(TYPING, (nickname) => { socket.broadcast.emit(RECIVE_TYPING, nickname) })
}