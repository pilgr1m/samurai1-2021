import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfileInfo, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { AppStateType } from '../../redux/reduxStore'
import { ProfileType } from '../../redux/types'


type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
	getProfileInfo: (id: number) => void
	getStatus: (id: number) => void
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
	userId: string
}
type PropsType = MapStatePropsType & MapDispatchType & RouteComponentProps<PathParamsType>



class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		let userId: number | null = +this.props.match.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {
				this.props.history.push("/login")
			}
		}
		if (!userId) {
			throw new Error("ID should be exists")
		} else {
			this.props.getProfileInfo(userId)
			this.props.getStatus(userId)
		}

	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}


	render() {

		return (
			<>
				<Profile
					isOwner={!this.props.match.params.userId}
					profile={this.props.profile}
					status={this.props.status}
					updateStatus={this.props.updateStatus}
					savePhoto={this.props.savePhoto}
					saveProfile={this.props.saveProfile}
				/>
			</>
		)
	}
}


const mapStateToProps = (state: AppStateType) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, {
		getProfileInfo,
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
