import { AppStateType } from '../../redux/reduxStore';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/dialogsReducer'
import withAuthRedirect from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'


const mapStateToProps = (state: AppStateType) => {
	console.log('state.dialogsPage', state.dialogsPage)

	return {
		dialogsPage: state.dialogsPage,
	}
}

export default compose(
	connect(
		mapStateToProps,
		{ sendMessage: actions.sendMessageAC }
	),
	withAuthRedirect
)(Dialogs)
