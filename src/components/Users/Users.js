import React from 'react'
import { NavLink } from 'react-router-dom'

import url from '../images/photoUrl.webp'
import style from './Users.module.css'


const Users = ({ totalCount, pageSize, users, onPageChange, currentPage, followingInProgress, unfollow, follow }) => {

	let pagesCount = Math.ceil(totalCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	const getFollow = (id) => {
		follow(id)
	}
	const getUnfollow = (id) => {
		unfollow(id)
	}

	return (
		<div className={style.usersBlock}>
			<span className={style.totalCount}>Total users: <span className={style.count}>{totalCount}</span></span>

			<div className={style.pagination}>
				{pages.map((page, index) => {
					return <span
						key={index}
						className={currentPage === page ? style.selectedPage : ""}
						onClick={() => { onPageChange(page) }}
					>
						{page}
					</span>
				})}
			</div>

			{users.map(user => {
				return <div key={user.id} className={style.userWrapper}>
					<span className={style.left}>
						<div>
							<NavLink to={`/profile/${user.id}`}>
								<img
									className={style.photo}
									src={
										(user.photos.small === null)
											? url
											: user.photos.small
									}
									alt="userPhoto"
								/>
							</NavLink>
						</div>
						<div>
							{user.followed
								? <button
									disabled={followingInProgress.some(id => id === user.id)}
									className={style.btnUsers}
									onClick={() => getUnfollow(user.id)}>

									Unfollow</button>

								: <button
									disabled={followingInProgress.some(id => id === user.id)}
									className={style.btnUsers}
									onClick={() => getFollow(user.id)}>
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

export default Users
