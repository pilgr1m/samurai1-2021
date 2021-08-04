import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { ResultCodesEnum, usersAPI } from "../api/api"
import { updateObjInArray } from "../components/utils/helpers"
import { AppStateType } from "./reduxStore"
import { UserType } from "./types"

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS"



let initialState = {
	users: [] as UserType[],
	totalCount: 0,
	pageSize: 5,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>,//arr user's ids
}
type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjInArray(state.users, action.userID, "id", { followed: true })
				// users: state.users.map(user => {
				// 	if (user.id === action.userID) {
				// 		return { ...user, followed: true }
				// 	}
				// 	return user
				// })
			}

		case UNFOLLOW:
			return {
				...state,
				users: updateObjInArray(state.users, action.userID, "id", { followed: false })
				// users: state.users.map(user => {
				// 	if (user.id === action.userID) {
				// 		return { ...user, followed: false }
				// 	}
				// 	return user
				// })
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
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}

		default: return state
	}
}

type ActionsTypes = FollowSuccessType | UnFollowSuccessType | SetUsersType |
	SetTotalUsersType | SetCurrentPageType | ToggleIsFetchingType | ToggleFollowProgressType

type FollowSuccessType = {
	type: typeof FOLLOW
	userID: number
}
export const followSuccess = (userID: number): FollowSuccessType => ({ type: FOLLOW, userID })

type UnFollowSuccessType = {
	type: typeof UNFOLLOW
	userID: number
}
export const unfollowSuccess = (userID: number): UnFollowSuccessType => ({ type: UNFOLLOW, userID })

type SetUsersType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users: UserType[]): SetUsersType => ({ type: SET_USERS, users })

type SetTotalUsersType = {
	type: typeof SET_TOTAL_USERS
	totalCount: number
}
export const setTotalUsers = (totalCount: number): SetTotalUsersType => ({ type: SET_TOTAL_USERS, totalCount })

type SetCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	pageNumber: number
}
export const setCurrentPage = (pageNumber: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, pageNumber })

type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowProgressType = {
	type: typeof TOGGLE_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}
export const toggleFollowProgress = (isFetching: boolean, userId: number): ToggleFollowProgressType => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId })


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsersThunk = (currentPage: number, pageSize: number): ThunkType => {
	return async (dispatch, getState) => {
		// let a = getState().app
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(currentPage))

		let response = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(response.items))
		dispatch(setTotalUsers(response.totalCount))
	}
}

type ActionCreatorType = (userID: number) => FollowSuccessType | UnFollowSuccessType
const _followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: any, actionCreator: ActionCreatorType) => {
	// debugger
	dispatch(toggleFollowProgress(true, id))
	let response = await apiMethod(id)

	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(actionCreator(id))
	}
	dispatch(toggleFollowProgress(false, id))
}

export const follow = (id: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, id, usersAPI.follow, followSuccess)
	}
}
export const unfollow = (id: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, id, usersAPI.unfollow, unfollowSuccess)
	}
}

