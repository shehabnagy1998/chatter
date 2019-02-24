const initState = {
    socketURL: 'http://localhost:8080/',
    sokcet: null
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}

export default rootReducer