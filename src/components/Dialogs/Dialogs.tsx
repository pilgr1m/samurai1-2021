import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, TextArea } from '../common/FormControls'
import { maxLengthCreator, required } from '../utils/validator'

import style from "./Dialogs.module.css"
import { InitialDialogStateType } from '../../redux/dialogsReducer'

const maxLength30 = maxLengthCreator(30)

type PropsType = {
	dialogsPage: InitialDialogStateType
	sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
	let state = props.dialogsPage


	let dialogsItems = state.dialogs.map(d => {
		return <DialogItem key={d.id} name={d.name} id={d.id} />
	})

	let messagesItems = state.messages.map(m => {
		return <Message key={m.id} message={m.message} />
	})
	const addNewMessage = (values: DialogFormValuesType) => {
		props.sendMessage(values.newMessageBody)
	}

	return (
		<div className={style.dialogs}>
			<div className={style.dialogsItems}>
				{dialogsItems}
			</div>
			<div className={style.messages}>
				<div>{messagesItems}</div>
			</div>
			<DialogReduxForm
				onSubmit={addNewMessage}
			/>
		</div>
	)
}

type DialogFormOwnPropsType = {}

const DialogForm: React.FC<InjectedFormProps<DialogFormValuesType, DialogFormOwnPropsType> & DialogFormOwnPropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={style.textWrapper}>
			<div>
				{createField<DialogFormValuesKeysType>(
					'Enter your message',
					'newMessageBody',
					[required, maxLength30],
					TextArea,
					"text",
					null,
					null,
					null
				)}
				{/* 
				<Field
					component={TextArea}
					validate={[required, maxLength30]}
					name="newMessageBody"
					placeholder="enter message"
					type="text"
				/> */}
			</div>
			<div>
				<button className={style.btnDialog}> Add </button>
			</div>
		</form>
	)
}

export type DialogFormValuesType = {
	newMessageBody: string
}
type DialogFormValuesKeysType = keyof DialogFormValuesType

const DialogReduxForm = reduxForm<DialogFormValuesType, DialogFormOwnPropsType>({ form: 'dialog' })(DialogForm)


export default Dialogs
