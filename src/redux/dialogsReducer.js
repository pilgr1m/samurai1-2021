const UPDATE_NEW_MESSAGE = "UPDATE_NEW_MESSAGE"
const SEND_MESSAGE = "SEND_MESSAGE"

let initialState = {
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
}

export const dialogsReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case UPDATE_NEW_MESSAGE:
            state.newMessageText = action.newMessage

            return state

        case SEND_MESSAGE:
            let id = state.messages.length + 1
            let newMessage = {
                id: id,
                message: state.newMessageText,
            }
            state.messages.push(newMessage)
            state.newMessageText = ""

            return state

        default: return state
    }
}

export const sendMessageAC = () => ({ type: SEND_MESSAGE })
export const updateNewMessageAC = (message) => {
    return { type: UPDATE_NEW_MESSAGE, newMessage: message }
}
