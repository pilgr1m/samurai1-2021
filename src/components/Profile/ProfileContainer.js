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

		let userId = this.props.match.params.userId
		// if (!userId) { userId = 7923 }
		this.props.getProfileInfo(userId)
		this.props.getStatus(userId)
	}

	render() {
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
