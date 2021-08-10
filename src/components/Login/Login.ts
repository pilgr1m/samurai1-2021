import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { login } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'
import { createField, Input } from '../common/FormControls'
import { required } from '../utils/validator'

import style from "./Login.module.css"


let LoginForm: React.FC<InjectedFormProps> = ({ handleSubmit, error, captchUrl }) => {

	return (
		<form onSubmit= { handleSubmit } >
		{ createField("email", "email", [required], Input, "text", style.inputLogin, null, null) }

	{ createField("password", "password", [required], Input, "password", style.inputPass, null, null) }


	{ createField(null, "rememberMe", [], Input, "checkbox", style.inputCheckbox, style.divCheckbox, "remember me") }

	{ captchUrl && <img src={ captchUrl } alt = "captcha" />}
	{
		captchUrl &&
			createField("symbols from image", "captcha", [required], Input, {})
	}

	{
		error
			? <div className={ style.formError }>
				{ error }
				< /div>
                        : null
            }

<div>
	<button className={ style.btn }> Login < /button>
		< /div>
		< /form>
)
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)


type MapStatePropsType = {
	isAuth: boolean
	captchaUrl: string | null
}
type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	const onSubmit = (formData: any) => {
		// console.log(formData)
		props.login(formData.email, formData.password, formData.rememberMe, formData.captch)
	}
	if (props.isAuth) {
		return <Redirect to="/profile" />
    }

	return (
		<div className= { style.loginWrapper } >
		<h3>Login < /h3>
		< LoginReduxForm onSubmit = { onSubmit } captchUrl = { props.captchUrl } />
			</div>
                                    )
}
const mapStateToProps = (state: AppStateType): MapDispatchPropsType => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login })(Login)
