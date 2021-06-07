import Preloader from "../../common/Preloader"
import ProfileStatus from "./ProfileStatus"

import style from "./ProfileInfo.module.css"
import ava from '../../images/ava.png'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {

	if (!profile) {
		return <Preloader />
	}

	const avatar = (profile.photos.large === null || !profile.photos) ? ava : profile.photos.large

	const onPhotoSelect = (e) => {
		console.log(e.target.files[0])
		if (e.target.files) {
			savePhoto(e.target.files[0])
		}
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

				<div className={style.name}>{profile.fullName}(id:{profile.userId})</div>

				<ProfileStatus
					status={status}
					updateStatus={updateStatus}
				/>

				<div className={style.aboutMe}>About me: "{profile.aboutMe}"</div>
				<div className={style.job}>Looking for a job: "{profile.lookingForAJobDescription}"</div>
				<div className={style.contacts}><span className={style.con}>Contacts:</span>
					<div>{profile.contacts.github}</div>
					<div>{profile.contacts.facebook}</div>
				</div>
			</div>
		</div>
	)
}
export default ProfileInfo