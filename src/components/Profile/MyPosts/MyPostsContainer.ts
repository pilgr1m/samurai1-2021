import { AppStateType } from './../../../redux/reduxStore';
import { connect } from 'react-redux'
import { actions } from '../../../redux/profileReducer'
import MyPosts, { MyPostsMapPropsType, MyPostsDispatchType } from './MyPosts'


const mapStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts,
	} as MyPostsMapPropsType
}


const MyPostsContainer = connect<MyPostsMapPropsType, MyPostsDispatchType, {}, AppStateType>(
	mapStateToProps,
	{ addPost: actions.addPostAC }
)(MyPosts)
//as React.ComponentType
export default MyPostsContainer
