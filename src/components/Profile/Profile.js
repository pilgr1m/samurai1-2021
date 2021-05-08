import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

// import style from "./Profile.module.css"


const Profile = (props) => {
	console.log(props)

	return (
		<>
			<ProfileInfo profile={props.profile} />
			<MyPostsContainer />
		</>
	)
}
export default Profile
