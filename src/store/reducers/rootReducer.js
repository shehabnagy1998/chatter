import {
    CREATE_USER,
    SET_SOCKET,
    SET_ERROR,
    SET_NICKNAME,
    SEND_MESSAGE,
    SET_MESSAGE,
    SET_TYPING,
    UPDATE_USERS,
    CHAT_WITH,
    SET_SOUND,
    SET_VIBRATION
} from "../../CONSTANTS";

const initState = {
    // socketURL: window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'http://192.168.1.2:8080',
    socketURL: '/',
    socket: null,
    nickname: '',
    message: '',
    typing: '',
    error: '',
    vibration: true,
    sound: true,
    user: {},
    chatWith: {},
    messages: {
        global: []
    },
    onlineUsers: []
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_SOCKET:
            return {
                ...state,
                socket: action.val
            }

        case SET_VIBRATION:
            return {
                ...state,
                vibration: action.val
            }
        case SET_SOUND:
            return {
                ...state,
                sound: action.val
            }

        case SET_NICKNAME:
            return {
                ...state,
                nickname: action.val
            }

        case SET_TYPING:
            return {
                ...state,
                typing: action.val
            }

        case CREATE_USER:
            return {
                ...state,
                user: action.val,
                error: ''
            }

        case SET_ERROR:
            return {
                ...state,
                error: action.val
            }

        case SET_MESSAGE:
            return {
                ...state,
                message: action.val
            }

        case SEND_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.val.dest]: state.messages[action.val.dest] ?
                        [...state.messages[action.val.dest], action.val.cont] :
                        [action.val.cont]
                }
            }

        case UPDATE_USERS:
            return {
                ...state,
                onlineUsers: action.val
            }

        case CHAT_WITH:
            return {
                ...state,
                chatWith: action.val
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer