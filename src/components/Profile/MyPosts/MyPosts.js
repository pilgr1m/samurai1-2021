import React from 'react'
import Post from './Post/Post'

import style from "./MyPosts.module.css"


const MyPosts = (props) => {

	let postsItems = props.posts.map(p => <Post key={p.id} message={p.post} likes={p.likes} />)

	return (
		<div className={style.myPostsWrapper}>
			<h3>My Posts</h3>
			<div>
				<textarea></textarea>
				<button>Add post</button>
			</div>

			<div className={style.posts}>
				{postsItems}
			</div>
		</div>
	)
}

export default MyPosts
