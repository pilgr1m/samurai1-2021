import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../utils/validator"
import style from "./FormControls.module.css"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { error, touched }, children }) => {
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

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export function createField<FormKeysType>(
    placeholder: string | undefined,
    name: FormKeysType,
    validator: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    type: string,
    className: string | null,
    classnamediv: string | null,
    text: string | null) {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validator}
            component={component}
            type={type}
            className={className}
            classnamediv={classnamediv}
        // text={text}
        />
        {text}
    </div>
}