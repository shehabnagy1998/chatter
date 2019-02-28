import { SET_SOCKET, CHAT_WITH, UPDATE_USERS, CREATE_USER, SET_ERROR, SET_NICKNAME, VERIFIY_USER, SEND_MESSAGE, SET_MESSAGE, SET_TYPING } from "../../CONSTANTS";

export const setSocket = val => {
    return dispatch => {
        dispatch({ type: SET_SOCKET, val: val });
    }
}

export const setNickname = val => {
    return dispatch => {
        dispatch({ type: SET_NICKNAME, val: val });
    }
}

export const setMessage = val => {
    return dispatch => {
        dispatch({ type: SET_MESSAGE, val: val });
    }
}

export const setTyping = val => {
    return dispatch => {
        dispatch({ type: SET_TYPING, val: val });
    }
}

export const setError = val => {
    return dispatch => {
        dispatch({ type: SET_ERROR, val: val });
    }
}

export const setUsers = val => {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_USERS, val: val })
    }
}

export const setChatWith = val => {
    return (dispatch, getState) => {
        dispatch({ type: CHAT_WITH, val: val })
    }
}

export const verifiyUser = val => {
    return (dispatch, getState) => {
        const { nickname, socket } = getState();
        socket.emit(VERIFIY_USER, nickname, (res) => {
            if (res.isUser) {
                dispatch({ type: SET_ERROR, val: 'nickname not available' });
            } else {
                socket.emit(CREATE_USER, res.user);
                dispatch({ type: CREATE_USER, val: res.user });
                val.push(`/${res.user.nickname}`);
            }
        });
    }
}

export const sendMessage = (dest, cont) => {
    return (dispatch) => {
        dispatch({
            type: SEND_MESSAGE, val: {
                dest: dest,
                cont: cont
            }
        });
    }
}