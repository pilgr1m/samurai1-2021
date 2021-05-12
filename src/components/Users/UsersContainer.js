import React from 'react'
import { connect } from 'react-redux'
import { setCurrentPage, toggleFollowProgress, getUsers, unfollow, follow } from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader'
import { compose } from 'redux'


class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)
		//код ниже ушел в thunk(creator) в редюсере
		// this.props.toggleIsFetching(true)
		// usersAPI.getUsers(currentPage, pageSize).then(response => {
		//     this.props.toggleIsFetching(false)
		//     this.props.setUsers(response.items)
		//     this.props.setTotalUsers(response.totalCount)
		// })
	}

	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		this.props.getUsers(pageNumber, this.props.pageSize)
	}

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					totalCount={this.props.totalCount}
					pageSize={this.props.pageSize}
					users={this.props.users}
					onPageChange={this.onPageChange}
					currentPage={this.props.currentPage}
					followingInProgress={this.props.followingInProgress}
					unfollow={this.props.unfollow}
					follow={this.props.follow}
				/>
			</>
		)
	}
}

const mapStatetoProps = (state) => {
	return {
		users: state.usersPage.users,
		totalCount: state.usersPage.totalCount,
		pageSize: state.usersPage.pageSize,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
	}
}

export default connect(mapStatetoProps, {
	setCurrentPage, toggleFollowProgress,
	getUsers, unfollow, follow
})(UsersContainer)
