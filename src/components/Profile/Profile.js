import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

// import style from "./Profile.module.css"


const Profile = (props) => {

	return (
		<>
			<ProfileInfo />
			{/* <MyPostsContainer
				posts={props.profilePage.posts}
				dispatch={props.dispatch}
				newPostText={props.profilePage.newPostText}
			/> */}
			<MyPostsContainer />
		</>
	)
}
export default Profile
