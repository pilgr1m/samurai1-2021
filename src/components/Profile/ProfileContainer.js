import React from 'react'
import axios from 'axios'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profileReducer'
// import style from "./Profile.module.css"


class ProfileContainer extends React.Component {
	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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


export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
