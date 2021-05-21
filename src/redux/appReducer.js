import { getAuthUserData } from "./authReducer"

const SET_INITIALIZED = "SET_INITIALIZED"


let initialState = {
    initialized: false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        default: return state
    }
}

export const initializedSuccess = () => ({ type: SET_INITIALIZED })

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())
        // promise.then(() => {
        //     dispatch(initializedSuccess())
        // })
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}

