import React from 'react'
import { connect } from 'react-redux'
import { follow, setCurrentPage, setTotalUsers, setUsers, toggleIsFetching, unfollow } from '../../redux/usersReducer'
import axios from 'axios'
import Users from './Users'
import Preloader from '../common/Preloader'


class UsersContainer extends React.Component {
    componentDidMount() {
        console.log("componentDidMount")

        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsers(response.data.totalCount)
            })
    }
    onPageChange = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsers(response.data.totalCount)
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
    }
}

export default connect(mapStatetoProps, {
    follow, unfollow, setUsers, setTotalUsers,
    setCurrentPage, toggleIsFetching,
})(UsersContainer)
