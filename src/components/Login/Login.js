import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/authReducer'
import { Input } from '../common/FormControls'
import { required } from '../utils/validator'

import style from "./Login.module.css"


let LoginForm = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div >
                <Field
                    validate={[required]}
                    className={style.inputLogin}
                    placeholder="email"
                    name="email"
                    component={Input}
                    type="text"
                />
            </div>
            <div>
                <Field
                    validate={[required]}
                    className={style.inputPass} placeholder="password"
                    name="password"
                    component={Input}
                    type="password"
                />
            </div>
            <div className={style.divCheckbox} >
                <Field
                    className={style.inputCheckbox}
                    name="rememberMe"
                    component="input"
                    type="checkbox"
                />
                remember me
            </div>

            {props.error
                ? <div className={style.formError}>
                    {props.error}
                </div>
                : null
            }

            <div >
                <button className={style.btn}> Login</button>
            </div>
        </form>
    )

}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        // console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to="/profile" />
    }

    return (
        <div className={style.loginWrapper}>
            <h3>Login </h3>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth })

export default connect(mapStateToProps, { login })(Login)
