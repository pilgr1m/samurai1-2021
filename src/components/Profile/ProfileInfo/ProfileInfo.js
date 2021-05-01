import style from "./ProfileInfo.module.css"
import ava from '../../images/ava.png'
import Preloader from "../../common/Preloader"

const ProfileInfo = ({ profile }) => {
    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={style.profileInfoWrapper}>
            <div>
                <img className={style.bigImage} src="https://wallpapershome.ru/images/pages/pic_h/6505.jpg" alt="imagee" />
            </div>

            <div className={style.avaDescr}>
                <img
                    className={style.ava}
                    src={profile.photos ? profile.photos.small : ava}
                    alt="ava" />
                <div className={style.name}>{profile.fullName}</div>
                <div className={style.aboutMe}>About me: "{profile.aboutMe}"</div>
                <div className={style.job}>Looking for a job: "{profile.lookingForAJobDescription}"</div>
                <div className={style.contacts}><span className={style.con}>Contacts:</span>
                    <div>{profile.contacts.github}</div>
                    <div>{profile.contacts.facebook}</div>
                    <div>{profile.contacts.instagram}</div>
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo