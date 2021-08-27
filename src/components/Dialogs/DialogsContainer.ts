import { AppStateType } from '../../redux/reduxStore';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import withAuthRedirect from '../hoc/withAuthRedirect';


const mapStateToProps = (state: AppStateType) => {
	console.log('state.dialogsPage', state.dialogsPage)

	return {
		dialogsPage: state.dialogsPage,
	}
}

export default compose<React.ComponentType>(
	connect(
		mapStateToProps,
		{ sendMessage: actions.sendMessageAC }
	),
	withAuthRedirect
)(Dialogs) as React.ComponentType
// )(Dialogs) as React.ComponentType
