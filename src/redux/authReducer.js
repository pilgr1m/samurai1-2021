
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
            // debugger
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default: return state
    }
}

export const setAuthUserData = (email, userId, login) => ({ type: SET_USER_DATA, data: { email, userId, login } })


