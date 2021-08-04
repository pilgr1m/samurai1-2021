import { stopSubmit } from "redux-form"
import { authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI } from "../api/api"
const SET_USER_DATA = "samurai2021/profile/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "samurai2021/profile/GET_CAPTCHA_URL_SUCCESS"


export type InitialStateType2 = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean | null
	captchaUrl: string | null
}

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false as boolean | null,
	captchaUrl: null as string | null,
}
export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				// "fff": 1112,
				...state,
				...action.data,
			}

		default: return state
	}
}

type DataPaylodType = {
	email: string | null
	userId: number | null
	login: string | null
	isAuth: boolean | null
}
type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA,
	data: DataPaylodType
}
export const setAuthUserData = (email: string | null, userId: number | null, login: string | null, isAuth: boolean | null): SetAuthUserDataActionType => ({ type: SET_USER_DATA, data: { email, userId, login, isAuth } })


type getCapthcaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl: string }
}
export const getCapthcaUrlSuccess = (captchaUrl: string): getCapthcaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


export const getAuthUserData = () => {
	return async (dispatch: any) => {
		let meData = await authAPI.me()

		if (meData.resultCode === 0) {
			let { email, id, login } = meData.data
			dispatch(setAuthUserData(email, id, login, true))
		}
	}
}

export const login = (email: string, password: string, rememberMe: boolean) => {
	return async (dispatch: any) => {
		let loginData = await authAPI.login(email, password, rememberMe)
		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
				dispatch(getCaptchaUrl())
			}
			let message = loginData.messages ? loginData.messages[0] : "some error"
			dispatch(stopSubmit("login", { _error: message }))
		}
	}
}

// export const logout = (email: string | null, password: string | null, rememberMe: boolean | undefined, captcha: string | null) => {
export const logout = () => {
	return async (dispatch: any) => {
		// let response = await authAPI.logout(email, password, rememberMe, captcha)
		let response = await authAPI.logout()
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false))
		}
	}
}

export const getCaptchaUrl = () => {
	return async (dispatch: any) => {
		const response = await securityAPI.getCaptchaUrl()
		const captchaUrl = response.data.url
		dispatch(getCapthcaUrlSuccess(captchaUrl))
	}
}


