import { ChangeEvent, MouseEventHandler, useState } from "react"
import ProfileDataForm from "./ProfileDataForm"
import Preloader from "../../common/Preloader"
import ProfileStatus from "./ProfileStatus"

import style from "./ProfileInfo.module.css"
import ava from '../../images/ava.png'
import { ContactsType, ProfileType } from "../../../redux/types"

type ProfileInfoPropsType = {
	profile: ProfileType | null
	status: string
	isOwner: boolean
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {

	const [editMode, setEditMode] = useState(false)

	if (!profile) {
		return <Preloader />
	}

	const avatar = (profile.photos.large === null || !profile.photos) ? ava : profile.photos.large

	const onPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) { savePhoto(e.target.files[0]) }
	}

	const onSubmit = (formData: ProfileType) => {
		saveProfile(formData).then(() => setEditMode(false))
	}

	return (
		<div className={style.profileInfoWrapper}>
			<div>
				<img className={style.bigImage} src="https://wallpapershome.ru/images/pages/pic_h/6505.jpg" alt="imagee" />
			</div>


			<div className={style.avaDescr}>
				<img
					className={style.ava}
					src={avatar}
					alt="avatar"
				/>
				{isOwner && <input type="file" onChange={onPhotoSelect} />}

				{editMode
					? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
					: <ProfileData
						profile={profile}
						isOwner={isOwner}
						goToEditMode={() => { setEditMode(true) }}
					/>
				}
				<ProfileStatus
					status={status}
					updateStatus={updateStatus}
				/>
			</div>
		</div>
	)
}

type ProfileDataPropsType = {
	profile: ProfileType
	isOwner: boolean
	goToEditMode: MouseEventHandler<HTMLButtonElement>
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
	return (
		<div>
			{isOwner && <div><button onClick={goToEditMode}> Edit</button></div>}

			<div className={style.name}>{`${profile.fullName} (id: ${profile.userId})`}</div>
			<div className={style.aboutMe}><b>About me:</b> "{profile.aboutMe}"</div>

			<div className={style.job}><b>Looking for a job:</b> "{profile.lookingForAJob ? "yES" : "nO"}"</div>

			<div className={style.job}><b>Skills:</b> "{profile.lookingForAJobDescription}"</div>

			<div className={style.contacts}><span className={style.con}>Contacts:</span>
				{Object.keys(profile.contacts).map(key => {
					return <Contacts key={key} title={key} value={profile.contacts[key as keyof ContactsType]} />
				})}

			</div>
		</div>
	)
}

type ContactsPropsType = {
	title: string
	value: string
}

export const Contacts: React.FC<ContactsPropsType> = ({ title, value }) => {
	return <div><b>{title}: </b> {!value ? " --- " : value} </div>
}
export default ProfileInfo