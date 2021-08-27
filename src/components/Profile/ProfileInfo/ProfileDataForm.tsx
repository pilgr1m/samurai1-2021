import React from "react"
import { reduxForm } from "redux-form"
import { ProfileType } from "../../../redux/types"
import { createField, Input, TextArea } from "../../common/FormControls"
import { Contacts } from "./ProfileInfo"

import style from "./ProfileInfo.module.css"


type PropsType = {
    profile: ProfileType
    initialValues: ProfileType
    onSubmit: () => void

}

const ProfileDataForm: React.FC<PropsType> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button> Save</button>
            </div>
            {error &&
                <div className={style.formError}>
                    {error}
                </div>
            }


            <div>
                <b>Full name: </b>:
                {createField("FullName", "fullName", [], Input, "text", "name",)}
            </div>
            <div>
                <b>Looking for a job:</b>: {createField("", "lookingForAJob", [], Input, "checkbox",)}
            </div>
            <div>
                <b>Skills: </b>: {createField("Skills", "lookingForAJobDescription", [], TextArea, "text",)}
            </div>
            <div>
                <b>About me: </b>: {createField("About Me", "aboutMe", [], TextArea, "text")}
            </div>

            <div className={style.contacts}><span className={style.con}>Contacts:</span>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={style.web}>
                        <b>{key}:</b>
                        <div className={style.formTextArea}>
                            {createField(key, `contacts.${key}`, [], TextArea, "text", "formTextAreaa")}
                        </div>

                    </div>
                })}

            </div>

        </form>
    )
}

const ProfileDataFormRedux = reduxForm({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormRedux