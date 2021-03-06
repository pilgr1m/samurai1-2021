import { initializeApp } from './appReducer'
import { Dispatch } from 'redux'
import { usersAPI } from '../api/usersAPI'
import { APIResponseType, ResultCodesEnum } from '../api/api'
import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { UserType } from './types'
import { updateObjInArray } from '../components/utils/helpers'

const initialState = {
	users: [] as UserType[],
	totalCount: 0,
	pageSize: 5,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //arr user's ids
	filter: {
		term: '',
		friend: null as null | boolean,
	},
}

export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'USER_REDUCER/FOLLOW':
			return {
				...state,
				users: updateObjInArray(state.users, action.userID, 'id', { followed: true }),
				// users: state.users.map(user => {
				// 	if (user.id === action.userID) {
				// 		return { ...user, followed: true }
				// 	}
				// 	return user
				// })
			}

		case 'USER_REDUCER/UNFOLLOW':
			return {
				...state,
				users: updateObjInArray(state.users, action.userID, 'id', { followed: false }),
				// users: state.users.map(user => {
				// 	if (user.id === action.userID) {
				// 		return { ...user, followed: false }
				// 	}
				// 	return user
				// })
			}

		case 'USER_REDUCER/SET_USERS':
			return { ...state, users: action.users }

		case 'USER_REDUCER/SET_TOTAL_USERS':
			return { ...state, totalCount: action.totalCount }

		case 'USER_REDUCER/SET_CURRENT_PAGE':
			return { ...state, currentPage: action.pageNumber }

		case 'USER_REDUCER/SET_FILTER':
			return { ...state, filter: action.payload }

		case 'USER_REDUCER/TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching }

		case 'USER_REDUCER/TOGGLE_FOLLOWING_PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter((id) => id !== action.userId),
			}

		default:
			return state
	}
}

export const actions = {
	followSuccess: (userID: number) => ({ type: 'USER_REDUCER/FOLLOW', userID } as const),
	unfollowSuccess: (userID: number) => ({ type: 'USER_REDUCER/UNFOLLOW', userID } as const),
	setUsers: (users: UserType[]) => ({ type: 'USER_REDUCER/SET_USERS', users } as const),
	setTotalUsers: (totalCount: number) =>
		({ type: 'USER_REDUCER/SET_TOTAL_USERS', totalCount } as const),
	setCurrentPage: (pageNumber: number) =>
		({ type: 'USER_REDUCER/SET_CURRENT_PAGE', pageNumber } as const),
	setFilter: (filter: FilterType) =>
		({ type: 'USER_REDUCER/SET_FILTER', payload: filter } as const),
	toggleIsFetching: (isFetching: boolean) =>
		({ type: 'USER_REDUCER/TOGGLE_IS_FETCHING', isFetching } as const),
	toggleFollowProgress: (isFetching: boolean, userId: number) =>
		({ type: 'USER_REDUCER/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId } as const),
}

export const requestUsersThunk = (
	currentPage: number,
	pageSize: number,
	filter: FilterType
): ThunkType => {
	return async (dispatch, getState) => {
		// let a = getState().app
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(currentPage))
		dispatch(actions.setFilter(filter))

		let response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(response.items))
		dispatch(actions.setTotalUsers(response.totalCount))
	}
}

const _followUnfollowFlow = async (
	dispatch: Dispatch<ActionsTypes>,
	id: number,
	apiMethod: (id: number) => Promise<APIResponseType>,
	actionCreator: (userID: number) => ActionsTypes
) => {
	// debugger
	dispatch(actions.toggleFollowProgress(true, id))
	let response = await apiMethod(id)

	if (response.resultCode === ResultCodesEnum.Success) {
		dispatch(actionCreator(id))
	}
	dispatch(actions.toggleFollowProgress(false, id))
}

export const follow = (id: number): ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch, id, usersAPI.follow, actions.followSuccess)
	}
}
export const unfollow = (id: number): ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch, id, usersAPI.unfollow, actions.unfollowSuccess)
	}
}
