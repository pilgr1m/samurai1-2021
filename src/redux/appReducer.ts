import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./authReducer"
import { AppStateType, InferActionsTypes } from "./reduxStore"


let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP_REDUCER/SET_INITIALIZED":
            return {
                ...state,
                initialized: true,
            }
        default: return state
    }
}

export const actions = {
    initializedSuccess: () => ({ type: "APP_REDUCER/SET_INITIALIZED"} as const )
}


// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessActionType>
// type DispatchType = Dispatch<initializedSuccessActionType>

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData())
        // promise.then(() => {
        //     dispatch(initializedSuccess())
        // })
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess())
        })
    }
}
