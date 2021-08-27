import React from 'react'
import Post from './Post/Post'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validator'
import { createField, TextArea } from '../../common/FormControls'
import style from "./MyPosts.module.css"
import { PostType } from '../../../redux/types'

const maxLength30 = maxLengthCreator(30)

type PostFormPropsType = {}

const PostForm: React.FC<InjectedFormProps<PostFormValuesType, PostFormPropsType> & PostFormPropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* <Field
				component={TextArea}
				name="newPostText"
				type="text"
				placeholder="enter post"
				validate={[required, maxLength10]}
			/> */}
			{createField<PostFormValuesKeysType>(
				'Enter post',
				'newPostText',
				[required, maxLength30],
				TextArea,
				"text",
				null,
				null,
				null
			)}
			<button className={style.btnPost}>Add post</button>
		</form>
	)
}

type PostFormValuesType = {
	newPostText: string
}
type PostFormValuesKeysType = keyof PostFormValuesType

const PostReduxForm = reduxForm<PostFormValuesType, PostFormPropsType>({ form: "post" })(PostForm)


type MyPostsPropsType = {
	posts: PostType[]
	addPost: (text: string) => void
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {
	let postsItems = props.posts.map(p => <Post key={p.id} message={p.post} likes={p.likes} />)

	const addPost = (values: PostFormValuesType) => {
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
