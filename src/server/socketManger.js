const io = require('./index').io;
const { VERIFIY_USER, CREATE_USER, SEND_MESSAGE, RECIVE_MESSAGE, TYPING, RECIVE_TYPING, RECIVE_ONLINE, SEND_PMESSAGE, RECIVE_PMESSAGE } = require('../CONSTANTS');

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
        io.emit(RECIVE_ONLINE, connectedUsers);
    });

    socket.on('disconnect', _ => {
        connectedUsers = connectedUsers.filter(user => user.socketID !== socket.id);
        io.emit(RECIVE_ONLINE, connectedUsers);
    })

    socket.on(SEND_MESSAGE, (message) => {
        console.log(message);
        socket.broadcast.emit(RECIVE_MESSAGE, message)
    });

    socket.on(SEND_PMESSAGE, (msg) => {
        console.log(msg);
        io.to(msg.reciver).emit(RECIVE_PMESSAGE, { dest: msg.content.sender, cont: msg.content })
    });

    socket.on(TYPING, (nickname) => {
        socket.broadcast.emit(RECIVE_TYPING, nickname)
    });
}