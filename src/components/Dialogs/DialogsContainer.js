import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/dialogsReducer'
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
			dispatch(actions.sendMessageAC(newMessage))
		},
	}
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
