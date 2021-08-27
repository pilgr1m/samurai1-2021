import { AppStateType } from './../../../redux/reduxStore';
import { connect } from 'react-redux'
import { actions } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'


const mapStateToProps = (state: AppStateType) => {
	return {
		newPostText: state.profilePage.newPostText,
		posts: state.profilePage.posts,
	}
}
const mapDispatchToProps = (dispatch: any) => {
	return {
		addPost: (newPostText: string) => dispatch(actions.addPostAC(newPostText)),
	}
}

const MyPostsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	// { addPost: actions.addPostAC(newPostText) }
)(MyPosts) as React.ComponentType
export default MyPostsContainer
