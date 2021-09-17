import { createSelector } from 'reselect'
import { AppStateType } from './reduxStore'

export const getUsers = (state: AppStateType) => {
	return state.usersPage.users
}

// export const getUserReSelector = createSelector(getUsers, twoDEp,
// 	(users, twoArg) => {
// 		debugger
// 		return users
// })

export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}
export const getTotalCount = (state: AppStateType) => {
	return state.usersPage.totalCount
}
export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}
export const getFollowingProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress
}
export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching
}
export const getUsersFilter = (state: AppStateType) => {
	return state.usersPage.filter
}
