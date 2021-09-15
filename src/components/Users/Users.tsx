import React from 'react'
import Paginator from '../common/Paginator'
import { UserType } from '../../redux/types'
import User from './User'
import { UsersSearchForm } from './UserSearchForm'

import style from './Users.module.css'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
	totalCount: number
	pageSize: number
	users: UserType[]
	currentPage: number
	followingInProgress: Array<number>
	onPageChange: (pageNumber: number) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	onFilterChange: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = ({
	totalCount,
	pageSize,
	users,
	onPageChange,
	currentPage,
	followingInProgress,
	unfollow,
	follow,
	onFilterChange,
}) => {
	return (
		<>
			<UsersSearchForm onFilterChange={onFilterChange} />

			<div className={style.usersBlock}>
				<span className={style.totalCount}>
					Total users: <span className={style.count}>{totalCount}</span>
				</span>

				<Paginator
					totalCount={totalCount}
					pageSize={pageSize}
					onPageChange={onPageChange}
					currentPage={currentPage}
				/>

				{users.map((user) => {
					return (
						<User
							key={user.id}
							user={user}
							followingInProgress={followingInProgress}
							unfollow={unfollow}
							follow={follow}
						/>
					)
				})}
			</div>
		</>
	)
}

export default Users
