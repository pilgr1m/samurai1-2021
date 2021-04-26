const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST = "UPDATE_NEW_POST"

let initialState = {
    posts: [
        { id: 1, post: "Hello, friend", likes: 5 },
        { id: 2, post: "Hi, dude!", likes: 7 },
    ],
    newPostText: "ivan react developer"
}

export const profileReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case ADD_POST:
            let id = state.posts.length + 1
            let newPost = {
                id: id,
                post: state.newPostText,
                likes: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""

            return state

        case UPDATE_NEW_POST:
            state.newPostText = action.newText

            return state

        default: return state
    }
}

export const addPostAC = () => ({ type: ADD_POST })
export const updateNewPostAC = (post) => {
    return { type: UPDATE_NEW_POST, newText: post }
}