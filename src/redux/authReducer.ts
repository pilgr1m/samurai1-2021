import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodesEnum, ResultCodesForCaptcha } from '../api/api'
import { authAPI } from '../api/authAPI'
import { securityAPI } from '../api/securityAPI'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false as boolean | null,
	captchaUrl: null as string | null,
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'AUTH_REDUCER/SET_USER_DATA':
		case 'AUTH_REDUCER/GET_CAPTCHA_URL_SUCCESS':
			return {
				...state,
				...action.data,
			}

		default:
			return state
	}
}

const actions = {
	setAuthUserData: (
		email: string | null,
		userId: number | null,
		login: string | null,
		isAuth: boolean | null
	) => ({ type: 'AUTH_REDUCER/SET_USER_DATA', data: { email, userId, login, isAuth } } as const),

	getCapthcaUrlSuccess: (captchaUrl: string) =>
		({ type: 'AUTH_REDUCER/GET_CAPTCHA_URL_SUCCESS', data: { captchaUrl } } as const),
}

export const getAuthUserData = (): ThunkType => {
	return async (dispatch) => {
		let meData = await authAPI.me()

		if (meData.resultCode === ResultCodesEnum.Success) {
			let { email, id, login } = meData.data
			dispatch(actions.setAuthUserData(email, id, login, true))
		}
	}
}

export const login = (
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string
): ThunkType => {
	return async (dispatch) => {
		let loginData = await authAPI.login(email, password, rememberMe, captcha)
		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
				dispatch(getCaptchaUrl())
			}
			let message = loginData.message ? loginData.message[0] : 'some error'
			dispatch(stopSubmit('login', { _error: message }))
		}
	}
}

// export const logout = (email: string | null, password: string | null, rememberMe: boolean | undefined, captcha: string | null) => {
export const logout = (): ThunkType => {
	return async (dispatch) => {
		// let response = await authAPI.logout(email, password, rememberMe, captcha)
		let response = await authAPI.logout()
		if (response.data.resultCode === 0) {
			dispatch(actions.setAuthUserData(null, null, null, false))
		}
	}
}

export const getCaptchaUrl = (): ThunkType => {
	return async (dispatch) => {
		const response = await securityAPI.getCaptchaUrl()
		const captchaUrl = response.url
		dispatch(actions.getCapthcaUrlSuccess(captchaUrl))
	}
}
