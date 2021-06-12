import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = "samurai2021/profile/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "samurai2021/profile/GET_CAPTCHA_URL_SUCCESS"


let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.data,
			}


		default: return state
	}
}

export const setAuthUserData = (email, userId, login, isAuth) => ({ type: SET_USER_DATA, data: { email, userId, login, isAuth } })
export const getCapthcaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

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
			if (response.data.resultCode === 10) {
				dispatch(getCaptchaUrl())
			}
			let message = response.data.messages ? response.data.messages[0] : "some error"
			dispatch(stopSubmit("login", { _error: message }))
		}
	}
}

export const logout = (email, password, rememberMe, captcha) => {
	return async (dispatch) => {
		let response = await authAPI.logout(email, password, rememberMe, captcha)
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false))
		}
	}
}

export const getCaptchaUrl = () => {
	return async (dispatch) => {
		const response = await securityAPI.getCaptchaUrl()
		const captchaUrl = response.data.url
		dispatch(getCapthcaUrlSuccess(captchaUrl))
	}
}


