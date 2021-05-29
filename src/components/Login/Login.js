import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/authReducer'
import { createField, Input } from '../common/FormControls'
import { required } from '../utils/validator'

import style from "./Login.module.css"


let LoginForm = ({ handleSubmit, error }) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField("email", "email", [required], Input, "text", style.inputLogin, null, null)}

            {createField("password", "password", [required], Input, "password", style.inputPass, null, null)}


            {createField(null, "rememberMe", [], Input, "checkbox", style.inputCheckbox, style.divCheckbox, "remember me")}

            {error
                ? <div className={style.formError}>
                    {error}
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
