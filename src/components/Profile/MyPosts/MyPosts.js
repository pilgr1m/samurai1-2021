import React from 'react'

import avatar from "../../images/avatar.png"
import style from "./MyPosts.module.css"
import Post from './Post/Post'


const MyPosts = () => {
	return (
		<div>
			My Posts
			<div>
				<textarea></textarea>
				<button>Add post</button>
			</div>
			<div className={style.posts}>
				<Post message="Hello, dude!" likes="5" />
				<Post message="Hi" likes="1" />
				<Post message="How are you?" likes="10" />
			</div>
		</div>
	)
}

export default MyPosts
