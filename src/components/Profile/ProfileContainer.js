import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfileInfo, getStatus, updateStatus } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'
// import style from "./Profile.module.css"


class ProfileContainer extends React.Component {
	componentDidMount() {
		// debugger
		let userId = this.props.match.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {
				this.props.history.push("/login")
			}
		}
		this.props.getProfileInfo(userId)
		this.props.getStatus(userId)
	}

	render() {
		// console.log("render profileContainer")
		return (
			<>
				<Profile
					profile={this.props.profile}
					status={this.props.status}
					updateStatus={this.props.updateStatus}
				/>
			</>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
	}
}

export default compose(
	connect(mapStateToProps, {
		getProfileInfo,
		getStatus,
		updateStatus,
	}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
