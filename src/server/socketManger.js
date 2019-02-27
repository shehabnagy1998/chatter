const io = require('./index').io;
const uuid = require('uuid/v4');
const { VERIFIY_USER, CREATE_USER, SEND_MESSAGE, RECIVE_MESSAGE, TYPING, RECIVE_TYPING, RECIVE_ONLINE, LOG_OFF } = require('../CONSTANTS');

let connectedUsers = [];

const isUser = (nickname) => {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].nickname.toLowerCase() === nickname.toLowerCase()) { return true }
    }
    return false
}

module.exports = function (socket) {

    socket.join('community');

    socket.on(VERIFIY_USER, (nickname, callback) => {
        if (isUser(nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({
                isUser: false, user: {
                    id: uuid(),
                    nickname,
                    userLetter: nickname.substring(0, 2).toUpperCase(),
                    socketID: socket.id
                }
            })
        }
    });

    socket.on(CREATE_USER, (user) => {
        connectedUsers = [
            ...connectedUsers,
            user
        ];
        socket.to('community').emit(RECIVE_ONLINE, connectedUsers);
    });

    socket.on('disconnect', _ => {
        connectedUsers = connectedUsers.filter(user => user.socketID !== socket.id);
        socket.to('community').emit(RECIVE_ONLINE, connectedUsers);
    })

    socket.on(SEND_MESSAGE, (message) => {
        socket.broadcast.to('community').emit(RECIVE_MESSAGE, message)
    });

    socket.on(TYPING, (nickname) => {
        socket.broadcast.to('community').emit(RECIVE_TYPING, nickname)
    });
}