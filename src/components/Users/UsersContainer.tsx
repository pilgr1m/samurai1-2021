import React from 'react'
import { connect } from 'react-redux'
import { requestUsersThunk, unfollow, follow, FilterType } from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader'
import {
	getCurrentPage,
	getFollowingProgress,
	getIsFetching,
	getPageSize,
	getTotalCount,
	getUsers,
} from '../../redux/usersSelectors'
import { UserType } from '../../redux/types'
import { AppStateType } from '../../redux/reduxStore'

type MapStatetoPropsType = {
	pageSize: number
	currentPage: number
	isFetching: boolean
	totalCount: number
	users: UserType[]
	followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
	requestUsersThunk: (currentPage: number, pageSize: number, term: string) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}

type OwnPropsType = {
	pageTitle: string
}

type PropsType = MapStatetoPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.requestUsersThunk(currentPage, pageSize, '')
		//код ниже ушел в thunk(creator) в редюсере
		// this.props.toggleIsFetching(true)
		// usersAPI.getUsers(currentPage, pageSize).then(response => {
		//     this.props.toggleIsFetching(false)
		//     this.props.setUsers(response.items)
		//     this.props.setTotalUsers(response.totalCount)
		// })
	}

	onPageChange = (pageNumber: number) => {
		// this.props.setCurrentPage(pageNumber)
		this.props.requestUsersThunk(pageNumber, this.props.pageSize, '')
	}

	onFilterChange = (filter: FilterType) => {
		const { pageSize, currentPage } = this.props
		this.props.requestUsersThunk(currentPage, pageSize, filter.term)
	}

	render() {
		return (
			<>
				<h4>{this.props.pageTitle}</h4>
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
					onFilterChange={this.onFilterChange}
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

const mapStatetoProps = (state: AppStateType): MapStatetoPropsType => {
	return {
		pageSize: getPageSize(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		totalCount: getTotalCount(state),
		users: getUsers(state),
		followingInProgress: getFollowingProgress(state),
	}
}

export default connect<MapStatetoPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
	mapStatetoProps,
	{
		unfollow,
		follow,
		requestUsersThunk,
	}
)(UsersContainer)
