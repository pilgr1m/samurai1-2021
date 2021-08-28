import React from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { ProfileType } from "../../../redux/types"
import { createField, Input, TextArea } from "../../common/FormControls"
import { Contacts } from "./ProfileInfo"
import style from "./ProfileInfo.module.css"


type ProfileDataFormOwnPropsType = {
    profile: ProfileType
}

type ProfileFormValuesKeysType = keyof ProfileType

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button> Save </button>
            </div>
            {error &&
                <div className={style.formError}>
                    {error}
                </div>
            }

            <div>
                <b>Full name: </b>:
                {createField<ProfileFormValuesKeysType>("FullName", "fullName", [], Input, "text", "name",)}
            </div>
            <div>
                <b>Looking for a job:</b>: {createField<ProfileFormValuesKeysType>("", "lookingForAJob", [], Input, "checkbox",)}
            </div>
            <div>
                <b>Skills: </b>: {createField<ProfileFormValuesKeysType>("Skills", "lookingForAJobDescription", [], TextArea, "text",)}
            </div>
            <div>
                <b>About me: </b>: {createField<ProfileFormValuesKeysType>("About Me", "aboutMe", [], TextArea, "text")}
            </div>

            <div className={style.contacts}><span className={style.con}>Contacts:</span>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={style.web}>
                        <b>{key}:</b>
                        <div className={style.formTextArea}>
                            {createField<ProfileFormValuesKeysType>(key, `contacts.${key}` as keyof ProfileType, [], TextArea, "text", "formTextArea")}
                        </div>

                    </div>
                })}

            </div>

        </form>
    )
}

const ProfileDataFormRedux = reduxForm<ProfileType, ProfileDataFormOwnPropsType>({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormRedux