import { createSelector } from "reselect"

export const getUsers = (state) => {
	return state.usersPage.users
}

// export const getUserReSelector = createSelector(getUsers, twoDEp,
// 	(users, twoArg) => {
// 		debugger
// 		return users
// })

export const getPageSize = (state) => {
	return state.usersPage.pageSize
}
export const getTotalCount = (state) => {
	return state.usersPage.totalCount
}
export const getCurrentPage = (state) => {
	return state.usersPage.currentPage
}
export const getFollowingProgress = (state) => {
	return state.usersPage.followingInProgress
}
export const getIsFetching = (state) => {
	return state.usersPage.isFetching
}
