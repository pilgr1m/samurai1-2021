import React from 'react'
import Post from './Post/Post'
import { addPostAC, updateNewPostAC } from '../../../redux/profileReducer'

import style from "./MyPosts.module.css"


const MyPosts = (props) => {
	// console.log("myposts: ", props)
	let postsItems = props.posts.map(p => <Post key={p.id} message={p.post} likes={p.likes} />)

	const newPostElem = React.createRef()

	let addPost = () => {
		props.dispatch(addPostAC())
	}

	let onPostChange = () => {
		let text = newPostElem.current.value
		props.dispatch(updateNewPostAC(text))
	}

	return (
		<div className={style.myPostsWrapper}>
			<h3>My Posts</h3>
			<div>
				<textarea
					ref={newPostElem}
					value={props.newPostText}
					onChange={onPostChange}
				/>
				<button onClick={addPost}>Add post</button>
			</div>

			<div className={style.posts}>
				{postsItems}
			</div>
		</div>
	)
}

export default MyPosts
