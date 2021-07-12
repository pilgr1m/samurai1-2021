const SEND_MESSAGE = "SEND_MESSAGE"

type DialogType = {
	id: number
	name: string
}
type MessageType = {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{ id: 1, name: "Miron" },
		{ id: 2, name: "Vanja" },
		{ id: 3, name: "Nastja" },
		{ id: 4, name: "Roma" },
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: "Hello, how are you?" },
		{ id: 2, message: "Yo, dude!" },
		{ id: 3, message: "Go learn react" },
	] as MessageType[],
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any):InitialStateType => {
	switch (action.type) {
		case SEND_MESSAGE: {
			let newMessage = {
				id: state.messages.length + 1,
				message: action.newMessage,
			}

			return {
				...state,
				messages: [...state.messages, newMessage],
			}
		}

		default: return state
	}
}

type SendMessageACType = {
	type: typeof SEND_MESSAGE
	newMessage: string
}
export const sendMessageAC = (newMessage: string):SendMessageACType => ({ type: SEND_MESSAGE, newMessage })
