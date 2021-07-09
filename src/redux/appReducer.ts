import { getAuthUserData } from "./authReducer"

const SET_INITIALIZED = "SET_INITIALIZED"

type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
}

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        default: return state
    }
}

type initializedSuccessActionType = {
    type: typeof SET_INITIALIZED
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: SET_INITIALIZED })

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData())
        // promise.then(() => {
        //     dispatch(initializedSuccess())
        // })
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}
