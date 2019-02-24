import { SET_SOCKET } from "../../CONSTANTS";

export const setSocket = val => {
    return dispatch => {
        dispatch({ type: SET_SOCKET, val: val });
    }
} 