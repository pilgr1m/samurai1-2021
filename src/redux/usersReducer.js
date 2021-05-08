import { usersAPI } from "../api/api"

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS"

let initialState = {
	users: [],
	totalCount: 0,
	pageSize: 5,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [],
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return { ...user, followed: true }
					}
					return user
				})
			}

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return { ...user, followed: false }
					}
					return user
				})
			}

		case SET_USERS:
			return { ...state, users: action.users }

		case SET_TOTAL_USERS:
			return { ...state, totalCount: action.totalCount }

		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.pageNumber }

		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching }

		case TOGGLE_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.followingInProgress
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}

		default: return state
	}
}

export const followSuccess = (userID) => ({ type: FOLLOW, userID })
export const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setTotalUsers = (totalCount) => ({ type: SET_TOTAL_USERS, totalCount })
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowProgress = (followingInProgress, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId })


export const getUsers = (currentPage, pageSize) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true))
		usersAPI.getUsers(currentPage, pageSize).then(response => {
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(response.items))
			dispatch(setTotalUsers(response.totalCount))
		})
	}
}

export const follow = (id) => {
	return (dispatch) => {
		dispatch(toggleFollowProgress(true, id))
		usersAPI.follow(id)
			.then(response => {
				if (response.data.resultCode === 0) {
					dispatch(followSuccess(id))
				}
				dispatch(toggleFollowProgress(false, id))
			})
	}
}
export const unfollow = (id) => {
	return (dispatch) => {
		dispatch(toggleFollowProgress(true, id))
		usersAPI.unfollow(id)
			.then(response => {
				if (response.data.resultCode === 0) {
					dispatch(unfollowSuccess(id))
				}
				dispatch(toggleFollowProgress(false, id))
			})
	}
}

