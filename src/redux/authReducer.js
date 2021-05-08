import { authAPI } from "../api/api"

const SET_USER_DATA = "SET_USER_DATA"


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: true,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default: return state
    }
}

export const setAuthUserData = (email, userId, login) => ({ type: SET_USER_DATA, data: { email, userId, login } })

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { email, id, login } = response.data.data
                    dispatch(setAuthUserData(email, id, login))
                }
            })
    }
}


