import React from 'react'
import axios from 'axios'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
// import style from "./Profile.module.css"


class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.match.params.userId
		if (!userId) { userId = 7923 }
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
			.then(response => {
				debugger
				this.props.setUserProfile(response.data)
			})
	}

	render() {
		return (
			<>
				<Profile {...this.props} />
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

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainer)
