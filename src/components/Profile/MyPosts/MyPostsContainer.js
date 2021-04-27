import { connect } from 'react-redux'
import { addPostAC, updateNewPostAC } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'


const mapStateToProps = (state) => {
	return {
		newPostText: state.profilePage.newPostText,
		posts: state.profilePage.posts,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateNewPostText: (text) => {
			let action = updateNewPostAC(text)
			dispatch(action)
		},
		addPost: () => dispatch(addPostAC()),
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer
