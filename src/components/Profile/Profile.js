import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

// import style from "./Profile.module.css"


const Profile = (props) => {

	return (
		<>
			<ProfileInfo />
			<MyPosts
				posts={props.profilePage.posts}
				dispatch={props.dispatch}
				newPostText={props.profilePage.newPostText}

			/>
		</>
	)
}
export default Profile
