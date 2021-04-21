import React from 'react'
import style from "./Post.module.css"
import avatar from "../../../images/avatar.png"

const Post = (props) => {
    return (
        <div className={style.item}>
            <img className={style.avatar} src={avatar} alt="ava" />
            {props.message}
            <div>
                <span>{props.likes} &#9825;</span>
            </div>
        </div>
    )
}

export default Post
