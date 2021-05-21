import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'
import { TextArea } from '../common/FormControls'

import style from "./Dialogs.module.css"
import { maxLengthCreator, required } from '../utils/validator'

const maxLength20 = maxLengthCreator(20)

const DialogForm = (props) => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit} className={style.textWrapper}>
			<div>
				<Field
					component={TextArea}
					validate={[required, maxLength20]}
					name="newMessageBody"
					placeholder="enter message"
					type="text"
				/>
			</div>
			<div>
				<button className={style.btnDialog}> add </button>
			</div>
		</form>
	)
}
const DialogReduxForm = reduxForm({ form: 'dialog' })(DialogForm)

const Dialogs = (props) => {
	let dialogsItems = props.dialogsPage.dialogs.map(d => {
		return <DialogItem key={d.id} name={d.name} id={d.id} />
	})
	let messagesItems = props.dialogsPage.messages.map(m => {
		return <Message key={m.id} message={m.message} />
	})

	const addNewMessage = (values) => {
		props.sendMessage(values.newMessageBody)
	}

	return (
		<div className={style.dialogs}>
			<div className={style.dialogsItems}>
				{dialogsItems}
			</div>
			<div className={style.messages}>
				<div>
					{messagesItems}
				</div>
			</div>
			<DialogReduxForm
				onSubmit={addNewMessage}
			/>
		</div>
	)
}

export default Dialogs
