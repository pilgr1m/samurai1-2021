import { stopSubmit } from "redux-form"
import { authAPI } from "../api/api"

const SET_USER_DATA = "samurai2021/profile/SET_USER_DATA"


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }

        default: return state
    }
}

export const setAuthUserData = (email, userId, login, isAuth) => ({ type: SET_USER_DATA, data: { email, userId, login, isAuth } })

export const getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let { email, id, login } = response.data.data
            dispatch(setAuthUserData(email, id, login, true))
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages ? response.data.messages[0] : "some error"
            dispatch(stopSubmit("login", { _error: message }))
        }
    }
}

export const logout = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.logout(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


