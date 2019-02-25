import { CREATE_USER, SET_SOCKET, SET_ERROR, SET_NICKNAME, SEND_MESSAGE, SET_MESSAGE, SET_TYPING } from "../../CONSTANTS";

const initState = {
    socketURL: window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'http://192.168.1.8:8080',
    socket: null,
    nickname: '',
    message: '',
    typing: '',
    error: '',
    user: {},
    messages: []
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_SOCKET:
            return {
                ...state,
                socket: action.val
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
                messages: [...state.messages, action.val]
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer