import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import style from "./Profile.module.css"


const Profile = () => {
	return (
		<>
			<div>
				<img className={style.bigImage} src="https://wallpapershome.ru/images/pages/pic_h/6505.jpg" alt="imagee" />
			</div>

			<div>
				ava+description
				</div>

			<MyPosts />
		</>
	)
}

export default Profile
