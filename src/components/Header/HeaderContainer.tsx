import React from 'react'
import { connect } from 'react-redux'
import Header, { HeaderPropsType, HeaderDispatchType } from './Header'
import { logout } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'


class HeaderContainer extends React.Component<HeaderPropsType & HeaderDispatchType> {
	render() {
		return (
			<Header
				{...this.props}
			// login={this.props.login}
			// logout={this.props.logout}
			// isAuth={this.props.isAuth}
			/>
		)
	}
}

const mapStateToProps = (state: AppStateType) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}
}

export default connect<HeaderPropsType, HeaderDispatchType, {}, AppStateType>(
	mapStateToProps,
	{ logout }
)(HeaderContainer)


