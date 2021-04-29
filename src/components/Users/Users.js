import React from 'react'
import axios from 'axios'

import url from '../images/photoUrl.webp'
import style from './Users.module.css'
import { setCurrentPageAC } from '../../redux/usersReducer'


class Users extends React.Component {

	componentDidMount() {
		console.log("componentDidMount")
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setUsers(response.data.items)
				this.props.setTotalUsers(response.data.totalCount)
			})
	}
	componentDidUpdate() { }

	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setUsers(response.data.items)
				this.props.setTotalUsers(response.data.totalCount)
			})
	}


	render() {
		console.log("render")
		let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize)
		let pages = []
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i)
		}
		console.log("this.props.currentPage", this.props.currentPage)
		console.log("pagesCount", pagesCount)
		console.log("this.props.pageSize", this.props.pageSize)


		return (
			<div className={style.usersBlock}>
				<span className={style.totalCount}>Total users: <span className={style.count}>{this.props.totalCount}</span></span>
				<div className={style.pagination}>
					{pages.map((page, index) => {
						return <span
							key={index}
							className={this.props.currentPage === page ? style.selectedPage : ""}
							onClick={() => { this.onPageChange(page) }}
						>
							{page}
						</span>
					})}
				</div>
				{/* <div>
					<button onClick={this.getUsers} className={style.btnGetUsers}>Get Users</button>
				</div> */}

				{this.props.users.map(user => {
					return <div key={user.id} className={style.userWrapper}>
						<span className={style.left}>
							<div>
								<img
									className={style.photo}
									src={
										(user.photos.small === null)
											? url
											: user.photos.small
									}
									alt="userPhoto"
								/>
							</div>
							<div>
								{user.followed
									? <button
										className={style.btn}
										onClick={() => this.props.unfollow(user.id)}>
										Unfollow</button>
									: <button
										className={style.btn}
										onClick={() => this.props.follow(user.id)}>
										Follow</button>
								}
							</div>
						</span>
						<span className={style.right}>
							<span>
								<div>
									<span className={style.spanLeft}>Name:</span> <span className={style.spanRight}>{user.name}</span>
								</div>
								<div>
									<span className={style.spanLeft}>Status:</span> <span className={style.spanRight}>{`${user.status}`}</span>
								</div>
								<div>
									<span className={style.spanLeft}>UserId:</span> <span className={style.spanRight}>{user.id}</span>
								</div>
							</span>
						</span>
					</div>
				})}
			</div>
		)
	}
}
export default Users
