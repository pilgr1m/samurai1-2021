import React from 'react'
import Paginator from '../common/Paginator'

import style from './Users.module.css'
//@ts-ignore
import User from './User.jsx'
import { UserType } from '../../redux/types'

type PropsType = {
	totalCount: number
	pageSize: number
	users: UserType[]
	currentPage: number
	followingInProgress: Array<number>
	onPageChange: (pageNumber: number) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ totalCount, pageSize, users, onPageChange, currentPage, followingInProgress, unfollow, follow }) => {

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
