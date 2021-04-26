import { dialogsReducer } from "./dialogsReducer"
import { profileReducer } from "./profileReducer"

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, post: "Hello, friend", likes: 5 },
                { id: 2, post: "Hi, dude!", likes: 7 },
            ],
            newPostText: "ivan react developer"
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: "Miron" },
                { id: 2, name: "Vanja" },
                { id: 3, name: "Nastja" },
                { id: 4, name: "Roma" },
            ],
            messages: [
                { id: 1, message: "Hello, how are you?" },
                { id: 2, message: "Yo, dude!" },
                { id: 3, message: "Go learn react" },
            ],
            newMessageText: ""
        },

    },
    _callSubscriber() {
        console.log("rerender")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

export default store
window.store = store