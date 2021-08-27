import { InferActionsTypes } from "./reduxStore"

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

export type InitialDialogStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export const dialogsReducer = (state = initialState, action: ActionsType): InitialDialogStateType => {
	switch (action.type) {
		case 'DIALOG_REDUCER/SEND_MESSAGE': {
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

export const actions = {
	sendMessageAC: (newMessage: string) => ({ type: 'DIALOG_REDUCER/SEND_MESSAGE', newMessage } as const)
}

