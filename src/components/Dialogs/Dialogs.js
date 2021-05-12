import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import style from "./Dialogs.module.css"
import { Redirect } from 'react-router-dom'


const Dialogs = (props) => {
    let dialogsItems = props.dialogsPage.dialogs.map(d => {
        return <DialogItem key={d.id} name={d.name} id={d.id} />
    })
    let messagesItems = props.dialogsPage.messages.map(m => {
        return <Message key={m.id} message={m.message} />
    })

    const addMessage = () => {
        props.sendMessage()
    }
    const onMessageChange = (event) => {
        let message = event.target.value
        props.updateNewMessage(message)
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

            <div className={style.textWrapper}>
                <div>
                    <textarea
                        placeholder="enter message"
                        onChange={onMessageChange}
                        value={props.dialogsPage.newMessageText}
                    />
                </div>
                <div>
                    <button
                        onClick={addMessage}
                    >
                        add
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Dialogs
