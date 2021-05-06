import React from 'react'
import { connect } from 'react-redux'
import { follow, setCurrentPage, setTotalUsers, setUsers, toggleIsFetching, unfollow, toggleFollowProgress } from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader'
import { usersAPI } from '../../api/api'


class UsersContainer extends React.Component {
    componentDidMount() {
        let { currentPage, pageSize } = this.props
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(currentPage, pageSize).then(response => {
            // debugger
            console.log(response)
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.items)
            this.props.setTotalUsers(response.totalCount)
        })
    }

    onPageChange = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)

        usersAPI.getUsers(pageNumber, this.props.pageSize).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.items)
            this.props.setTotalUsers(response.totalCount)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    isFetching={this.props.isFetching}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChange={this.onPageChange}
                    toggleFollowProgress={this.props.toggleFollowProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,

    }
}

export default connect(mapStatetoProps, {
    follow, unfollow, setUsers, setTotalUsers,
    setCurrentPage, toggleIsFetching, toggleFollowProgress
})(UsersContainer)
