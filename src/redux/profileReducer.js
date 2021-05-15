import { profileAPI } from "../api/api"

const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST = "UPDATE_NEW_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState = {
    posts: [
        { id: 1, post: "Hello, friend", likes: 5 },
        { id: 2, post: "Hi, dude!", likes: 7 },
    ],
    newPostText: "don't stop!",
    profile: null,
    status: "",
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.posts.length + 1,
                post: state.newPostText,
                likes: 0
            }
            return {
                ...state,
                newPostText: "",
                posts: [...state.posts, newPost]
            }
        }

        case UPDATE_NEW_POST: {
            return { ...state, newPostText: action.newText }
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case SET_STATUS: {
            return { ...state, status: action.status }
        }

        default: return state
    }
}

export const addPostAC = () => ({ type: ADD_POST })
export const updateNewPostAC = (post) => {
    return { type: UPDATE_NEW_POST, newText: post }
}
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}
export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}


export const getProfileInfo = (id = 7923) => {
    return (dispatch) => {
        profileAPI.getProfile(id)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}

export const getStatus = (id = 7923) => {
    return (dispatch) => {
        profileAPI.getStatus(id)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

