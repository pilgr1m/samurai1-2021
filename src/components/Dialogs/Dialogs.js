import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import style from "./Dialogs.module.css"


const Dialogs = (props) => {

    let dialogsItems = props.state.dialogs.map(d => {
        return <DialogItem key={d.id} name={d.name} id={d.id} />
    })

    let messagesItems = props.state.messages.map(m => {
        return <Message key={m.id} message={m.message} />
    })

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsItems}
            </div>
            <div className={style.messages}>
                {messagesItems}
            </div>
        </div>
    )
}

export default Dialogs
