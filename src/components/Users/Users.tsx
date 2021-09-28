import React, { useEffect } from 'react'
import Paginator from '../common/Paginator'
import { User } from './User'
import { UsersSearchForm } from './UserSearchForm'
import { FilterType, requestUsersThunk, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCurrentPage,
	getFollowingProgress,
	getPageSize,
	getTotalCount,
	getUsers,
	getUsersFilter,
} from '../../redux/usersSelectors'

import style from './Users.module.css'

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
	// const state = useSelector(state => state.state)
	const dispatch = useDispatch()

	const users = useSelector(getUsers)
	const totalCount = useSelector(getTotalCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingProgress)

	useEffect(() => {
		dispatch(requestUsersThunk(currentPage, pageSize, filter))
	}, [])

	const onPageChange = (pageNumber: number) => {
		dispatch(requestUsersThunk(pageNumber, pageSize, filter))
	}

	const onFilterChange = (filter: FilterType) => {
		dispatch(requestUsersThunk(1, pageSize, filter))
	}

	const followUser = (userId: number) => {
		dispatch(follow(userId))
	}

	const unfollowUser = (userId: number) => {
		dispatch(unfollow(userId))
	}

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
							unfollow={unfollowUser}
							follow={followUser}
						/>
					)
				})}
			</div>
		</>
	)
}
