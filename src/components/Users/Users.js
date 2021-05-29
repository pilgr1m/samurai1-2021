import React from 'react'
import Paginator from '../common/Paginator'

import style from './Users.module.css'
import User from './User'


const Users = ({ totalCount, pageSize, users, onPageChange, currentPage, followingInProgress, unfollow, follow }) => {

	return (
		<div className={style.usersBlock}>

			<span className={style.totalCount}>Total users: <span className={style.count}>{totalCount}</span></span>

			<Paginator totalCount={totalCount} pageSize={pageSize} onPageChange={onPageChange} currentPage={currentPage} />

			{users.map(user => {
				return <User
					key={user.id}
					user={user}
					followingInProgress={followingInProgress}
					unfollow={unfollow}
					follow={follow}
				/>
			})}

		</div>
	)
}
export default Users
