import { connect } from 'react-redux'
import { followAC, setTotalUsersAC, setUsersAC, unfollowAC } from '../../redux/usersReducer'
import Users from './Users'


const mapStatetoProps = (state) => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsers: (totalCount) => {
            dispatch(setTotalUsersAC(totalCount))
        },
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Users)
