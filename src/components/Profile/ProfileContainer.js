import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfileInfo } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
// import style from "./Profile.module.css"


class ProfileContainer extends React.Component {

	componentDidMount() {
		let userId = this.props.match.params.userId
		// if (!userId) { userId = 7923 }
		this.props.getProfileInfo(userId)
	}

	render() {
		console.log(this.props)
		return (
			<>
				<Profile profile={this.props.profile} />
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile
	}
}

const WithUrlDataContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, { getProfileInfo })(WithUrlDataContainer)
