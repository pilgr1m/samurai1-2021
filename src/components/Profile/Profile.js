import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

// import style from "./Profile.module.css"


const Profile = (props) => {

	return (
		<>
			<ProfileInfo />
			<MyPosts posts={props.state.posts} />
		</>
	)
}
export default Profile
