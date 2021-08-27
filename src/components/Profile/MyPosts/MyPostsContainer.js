import { connect } from 'react-redux'
import { actions } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'


const mapStateToProps = (state) => {
	return {
		newPostText: state.profilePage.newPostText,
		posts: state.profilePage.posts,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => dispatch(actions.addPostAC(newPostText)),
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer
