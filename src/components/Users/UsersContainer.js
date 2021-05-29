import React from 'react'
import { connect } from 'react-redux'
import { setCurrentPage, toggleFollowProgress, requestUsersThunk, unfollow, follow } from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader'
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getTotalCount, getUsers } from '../../redux/usersSelectors'

class UsersContainer extends React.Component {

	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.requestUsersThunk(currentPage, pageSize)
		//код ниже ушел в thunk(creator) в редюсере
		// this.props.toggleIsFetching(true)
		// usersAPI.getUsers(currentPage, pageSize).then(response => {
		//     this.props.toggleIsFetching(false)
		//     this.props.setUsers(response.items)
		//     this.props.setTotalUsers(response.totalCount)
		// })
	}

	onPageChange = (pageNumber) => {
		// this.props.setCurrentPage(pageNumber)
		this.props.requestUsersThunk(pageNumber, this.props.pageSize)
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

// const mapStatetoProps = (state) => {
// 	return {
// 		users: state.usersPage.users,
// 		totalCount: state.usersPage.totalCount,
// 		pageSize: state.usersPage.pageSize,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress,
// 	}
// }

const mapStatetoProps = (state) => {
	return {
		// users: getUsers(state),
		users: getUsers(state),
		totalCount: getTotalCount(state),
		pageSize: getPageSize(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingProgress(state),
	}
}

export default connect(mapStatetoProps, {
	unfollow, follow, setCurrentPage,
	toggleFollowProgress, requestUsersThunk,
})(UsersContainer)
