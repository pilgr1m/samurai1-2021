import { Field } from "redux-form"
import style from "./FormControls.module.css"

const FormControl = ({ input, meta: { error, touched }, children }) => {
    const hasError = error && touched
    return (
        <div className={`${style.form} ${hasError ? style.error : ""}`}>
            <div>
                {children}
            </div>
            {hasError && <span> {error} </span>}
        </div>
    )
}

export const TextArea = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const createField = (placeholder, name, validator, component, type, className, classNameDiv, text) => (
    <Field
        placeholder={placeholder}
        name={name}
        validate={validator}
        component={component}
        type={type}
        className={className}
        text={text}
    />
)