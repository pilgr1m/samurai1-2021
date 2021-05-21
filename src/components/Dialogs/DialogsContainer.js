import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessageAC } from '../../redux/dialogsReducer'
import withAuthRedirect from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (newMessage) => {
			dispatch(sendMessageAC(newMessage))
		},
	}
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
