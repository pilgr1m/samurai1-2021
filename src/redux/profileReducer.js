import { profileAPI } from "../api/api"

const ADD_POST = "samurai2021/profile/ADD_POST"
const SET_USER_PROFILE = "samurai2021/profile/SET_USER_PROFILE"
const SET_STATUS = "samurai2021/profile/SET_STATUS"
const DELETE_POST = "samurai2021/profile/DELETE_POST"


let initialState = {
	posts: [
		{ id: 1, post: "Hello, friend", likes: 5 },
		{ id: 2, post: "Hi, dude!", likes: 7 },
	],
	profile: null,
	status: "",
}

export const profileReducer = (state = initialState, action) => {
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

		default: return state
	}
}

export const addPostAC = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => {
	return { type: SET_USER_PROFILE, profile }
}
export const setStatus = (status) => {
	return { type: SET_STATUS, status }
}
export const deletePost = (postId) => {
	return { type: DELETE_POST, postId }
}


export const getProfileInfo = (id) => {
	return async (dispatch) => {
		let response = await profileAPI.getProfile(id)
		dispatch(setUserProfile(response.data))
	}
}

export const getStatus = (id) => {
	return async (dispatch) => {
		let response = await profileAPI.getStatus(id)
		dispatch(setStatus(response.data))
	}
}
export const updateStatus = (status) => {
	return async (dispatch) => {
		let response = await profileAPI.updateStatus(status)
		if (response.data.resultCode === 0) {
			dispatch(setStatus(status))
		}

	}
}

