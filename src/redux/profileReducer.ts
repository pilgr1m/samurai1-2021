import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"
import {PhotosType, PostType, ProfileType} from "./types";

const ADD_POST = "samurai2021/profile/ADD_POST"
const SET_USER_PROFILE = "samurai2021/profile/SET_USER_PROFILE"
const SET_STATUS = "samurai2021/profile/SET_STATUS"
const DELETE_POST = "samurai2021/profile/DELETE_POST"
const SAVE_PHOTO = "samurai2021/profile/SAVE_PHOTO"
const SAVE_PROFILE = "samurai2021/profile/SAVE_PROFILE"



let initialState = {
	posts: [
		{ id: 1, post: "Hello, friend", likes: 5 },
		{ id: 2, post: "Hi, dude!", likes: 7 },
	] as PostType[],
	profile: null as ProfileType | null,
	status: "",
}

export type InitialStateType = typeof initialState
export const profileReducer = (state = initialState, action: any):InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: state.posts.length + 1,
				post: action.newPostText,
				likes: 0
			}
			return {
				...state,
				posts: [...state.posts, newPost]
			}
		}

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile }
		}

		case SET_STATUS: {
			return { ...state, status: action.status }
		}

		case DELETE_POST: {
			return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
		}

		case SAVE_PHOTO: {
			return { ...state, profile: { ...state.profile, photos: action.photos }as ProfileType }
		}

		case SAVE_PROFILE: {
			return { ...state, profile: action.profile }
		}

		default: return state
	}
}
type AddPostACType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPostAC = (newPostText:string):AddPostACType => ({ type: ADD_POST, newPostText })

type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileType => {
	return { type: SET_USER_PROFILE, profile }
}

type SetStatusType = {
	type: typeof SET_STATUS
	status: string
}
export const setStatus = (status:string):SetStatusType=> {
	return { type: SET_STATUS, status }
}

type DeletePostType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId:number):DeletePostType => {
	return { type: DELETE_POST, postId }
}

type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO
	photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessType => {
	return { type: SAVE_PHOTO, photos }
}

type SaveProfileSuccessType = {
	type: typeof SAVE_PROFILE
	profile: ProfileType
}
export const saveProfileSuccess = (profile:ProfileType):SaveProfileSuccessType => {
	return { type: SAVE_PROFILE, profile }
}

export const getProfileInfo = (id:number) => {
	return async (dispatch:any) => {
		const response = await profileAPI.getProfile(id)
		dispatch(setUserProfile(response.data))
	}
}

export const getStatus = (id:number) => {
	return async (dispatch:any) => {
		const response = await profileAPI.getStatus(id)
		dispatch(setStatus(response.data))
	}
}
export const updateStatus = (status:string) => {
	return async (dispatch:any) => {
		try {
			const response = await profileAPI.updateStatus(status)
			if (response.data.resultCode === 0) {
				dispatch(setStatus(status))
			}
		} catch (error) {
			console.log("some error")
		}
	}
}

export const savePhoto = (file:any) => {
	return async (dispatch:any) => {
		const response = await profileAPI.savePhoto(file)
		debugger
		if (response.data.resultCode === 0) {
			dispatch(savePhotoSuccess(response.data.data.photo))
		}
	}
}

export const saveProfile = (profile: ProfileType) => {
	return async (dispatch:any, getState:any) => {
		const userId = getState().auth.userId
		const response = await profileAPI.saveProfile(profile)

		if (response.data.resultCode === 0) {
			dispatch(getProfileInfo(userId))
		} else {
			console.log(response.data)
			dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
			// dispatch(stopSubmit("edit-profile", { "contacts": { "facebook": response.data.messages[0] } }))
			return Promise.reject(response.data.messages[0])
		}
	}
}