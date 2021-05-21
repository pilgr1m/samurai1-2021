import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

// import style from "./Profile.module.css"


const Profile = (props) => {
	// debugger
	return (
		<>
			<ProfileInfo
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
			/>
			<MyPostsContainer />
		</>
	)
}
export default Profile
