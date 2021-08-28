import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profileAPI"
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { PhotosType, PostType, ProfileType } from "./types";

let initialState = {
	posts: [
		{ id: 1, post: "Hello, friend", likes: 5 },
		{ id: 2, post: "Hi, dude!", likes: 7 },
	] as PostType[],
	profile: null as ProfileType | null,
	status: "",
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'PROFILE_REDUCER/ADD_POST': {
			let newPost = {
				id: state.posts.length + 1,
				post: action.newPostText,
				likes: 0
			}
			return {
				...state,
				posts: [...state.posts, newPost],
			}
		}

		case 'PROFILE_REDUCER/SET_USER_PROFILE': {
			return { ...state, profile: action.profile }
		}

		case 'PROFILE_REDUCER/SET_STATUS': {
			return { ...state, status: action.status }
		}

		case 'PROFILE_REDUCER/DELETE_POST': {
			return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
		}

		case 'PROFILE_REDUCER/SAVE_PHOTO': {
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
		}

		case 'PROFILE_REDUCER/SAVE_PROFILE': {
			return { ...state, profile: action.profile }
		}

		default: return state
	}
}

export const actions = {
	addPostAC: (newPostText: string) => ({ type: "PROFILE_REDUCER/ADD_POST", newPostText } as const),
	setUserProfile: (profile: ProfileType) => ({ type: "PROFILE_REDUCER/SET_USER_PROFILE", profile } as const),
	setStatus: (status: string) => ({ type: "PROFILE_REDUCER/SET_STATUS", status } as const),
	deletePost: (postId: number) => ({ type: "PROFILE_REDUCER/DELETE_POST", postId } as const),
	savePhotoSuccess: (photos: PhotosType) => ({ type: "PROFILE_REDUCER/SAVE_PHOTO", photos } as const),
	saveProfileSuccess: (profile: ProfileType) => ({ type: "PROFILE_REDUCER/SAVE_PROFILE", profile } as const),
}

export const getProfileInfo = (id: number): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.getProfile(id)
		dispatch(actions.setUserProfile(response))
	}
}
export const getStatus = (id: number): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.getStatus(id)
		dispatch(actions.setStatus(response))
	}
}
export const updateStatus = (status: string): ThunkType => {
	return async (dispatch) => {
		try {
			const response = await profileAPI.updateStatus(status)
			if (response.resultCode === 0) {
				dispatch(actions.setStatus(status))
			}
		} catch (error) {
			console.log("some error")
		}
	}
}
export const savePhoto = (file: File): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.savePhoto(file)
		debugger
		if (response.resultCode === 0) {
			dispatch(actions.savePhotoSuccess(response.data.photos))
		}
	}
}
export const saveProfile = (profile: ProfileType): ThunkType => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId
		const response = await profileAPI.saveProfile(profile)

		if (response.resultCode === 0) {
			if (userId != null) {
				dispatch(getProfileInfo(userId))
			} else {
				throw new Error("userId can't be null")
			}

		} else {
			console.log(response.data)
			dispatch(stopSubmit("edit-profile", { _error: response.message[0] }))
			// dispatch(stopSubmit("edit-profile", { "contacts": { "facebook": response.data.messages[0] } }))
			return Promise.reject(response.message[0])
		}
	}
}
