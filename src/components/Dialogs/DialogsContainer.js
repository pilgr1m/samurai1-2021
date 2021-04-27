import { connect } from 'react-redux'
import { sendMessageAC, updateNewMessageAC } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'



const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
