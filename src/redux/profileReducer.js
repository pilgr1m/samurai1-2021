const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST = "UPDATE_NEW_POST"

let initialState = {
    posts: [
        { id: 1, post: "Hello, friend", likes: 5 },
        { id: 2, post: "Hi, dude!", likes: 7 },
    ],
    newPostText: "don't stop!"
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

        default: return state
    }
}

export const addPostAC = () => ({ type: ADD_POST })
export const updateNewPostAC = (post) => {
    return { type: UPDATE_NEW_POST, newText: post }
}