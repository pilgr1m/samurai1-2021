import React from 'react'
import Post from './Post/Post'
import { reduxForm, Field } from 'redux-form'

import style from "./MyPosts.module.css"
import { maxLengthCreator, required } from '../../utils/validator'
import { TextArea } from '../../common/FormControls'

const maxLength10 = maxLengthCreator(10)

const PostForm = (props) => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit}>
			<Field
				component={TextArea}
				name="newPostText"
				type="text"
				placeholder="enter post"
				validate={[required, maxLength10]}
			/>
			<button className={style.btnPost}>Add post</button>
		</form>
	)
}
const PostReduxForm = reduxForm({ form: "post" })(PostForm)

const MyPosts = React.memo((props) => {
	let postsItems = props.posts.map(p => <Post key={p.id} message={p.post} likes={p.likes} />)

	const addPost = (values) => {
		// debugger
		props.addPost(values.newPostText)
	}

	return (
		<div className={style.myPostsWrapper}>
			<h3>My Posts</h3>
			<PostReduxForm onSubmit={addPost} />

			<div className={style.posts}>
				{postsItems}
			</div>
		</div>
	)
})

export default MyPosts
