import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfileInfo } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'
// import style from "./Profile.module.css"


class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.match.params.userId
		// if (!userId) { userId = 7923 }
		this.props.getProfileInfo(userId)
	}

	render() {
		return (
			<>
				<Profile profile={this.props.profile} />
			</>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
	}
}


export default compose(
	connect(mapStateToProps, { getProfileInfo }),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
