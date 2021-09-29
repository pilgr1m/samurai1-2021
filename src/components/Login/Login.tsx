import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { login } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'
import { createField, Input } from '../common/FormControls'
import { required } from '../utils/validator'

import style from './Login.module.css'

type LoginFormOwnPropsType = {
	captchaUrl: string | null
}

const LoginForm: React.FC<
	InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType
> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField<LoginFormValuesKeysType>(
				'email',
				'email',
				[required],
				Input,
				'text',
				style.inputLogin,
				null,
				null
			)}

			{createField<LoginFormValuesKeysType>(
				'password',
				'password',
				[required],
				Input,
				'password',
				style.inputPass,
				null,
				null
			)}

			{createField<LoginFormValuesKeysType>(
				undefined,
				'rememberMe',
				[],
				Input,
				'checkbox',
				style.inputCheckbox,
				style.divCheckbox,
				'remember me'
			)}

			{captchaUrl && <img src={captchaUrl} alt='captcha' />}
			{captchaUrl &&
				createField<LoginFormValuesKeysType>(
					'Symbols from image',
					'captcha',
					[required],
					Input,
					'',
					null,
					null,
					null
				)}

			{error ? <div className={style.formError}>{error} </div> : null}

			<div>
				<button className={style.btn}> Login </button>
			</div>
		</form>
	)
}

type LoginFormValuesType = {
	captcha: string
	rememberMe: boolean
	password: string
	email: string
}

type LoginFormValuesKeysType = keyof LoginFormValuesType

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(
	LoginForm
)

export const LoginPage: React.FC = (props) => {
	const dispatch = useDispatch()
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

	const onSubmit = (formData: LoginFormValuesType) => {
		// console.log(formData)
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}
	if (isAuth) {
		return <Redirect to='/profile' />
	}

	return (
		<div className={style.loginWrapper}>
			<h3>Login </h3>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}
