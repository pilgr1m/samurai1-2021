import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./authReducer"
import { AppStateType } from "./reduxStore"

const SET_INITIALIZED = "SET_INITIALIZED"

type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
}

export const appReducer = (state = initialState, action: initializedSuccessActionType): InitialStateType => {
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

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessActionType>
// type DispatchType = Dispatch<initializedSuccessActionType>

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
