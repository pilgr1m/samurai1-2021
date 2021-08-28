import React from 'react'
import { ProfileType } from '../../redux/types'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


// type PropsType = {
// 	isOwner: boolean
// 	profile: ProfileType
// 	status: string

// 	updateStatus: (status: string) => void
// 	savePhoto: (file: File) => void
// 	saveProfile: (profile: ProfileType) => void
// }

// const Profile: React.FC<PropsType> = (props) => {
const Profile = (props: any) => {
	return (
		<>
			<ProfileInfo
				saveProfile={props.saveProfile}
				savePhoto={props.savePhoto}
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
			/>
			<MyPostsContainer />
		</>
	)
}
export default Profile
