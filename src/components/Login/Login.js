import React from 'react'
import { Field, reduxForm } from 'redux-form'

import style from "./Login.module.css"

let LoginForm = (props) => {

    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div >
                <Field className={style.inputLogin} placeholder="login" name="login" component="input" type="text" />
            </div>
            <div>
                <Field className={style.inputPass} placeholder="password" name="password" component="input" type="text" />
            </div>
            <div className={style.divCheckbox} >
                <Field className={style.inputCheckbox} name="rememberMe" component="input" type="checkbox" />
                remember me
            </div>
            <div >
                <button className={style.btn}> Login</button>
            </div>
        </form>
    )

}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div className={style.loginWrapper}>
            <h3>Login </h3>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
export default Login
