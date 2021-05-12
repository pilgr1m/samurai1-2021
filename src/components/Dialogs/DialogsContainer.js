import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessageAC, updateNewMessageAC } from '../../redux/dialogsReducer'
import withAuthRedirect from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateNewMessage: (message) => {
			dispatch(updateNewMessageAC(message))
		},
		sendMessage: () => {
			dispatch(sendMessageAC())
		},
	}
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
