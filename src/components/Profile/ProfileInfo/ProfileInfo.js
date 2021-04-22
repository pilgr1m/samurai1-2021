import style from "./ProfileInfo.module.css"


const ProfileInfo = () => {
    return (
        <div className={style.profileInfoWrapper}>
            <div>
                <img className={style.bigImage} src="https://wallpapershome.ru/images/pages/pic_h/6505.jpg" alt="imagee" />
            </div>

            <div className={style.avaDescr}>
                ava+description
			</div>
        </div>
    )
}
export default ProfileInfo