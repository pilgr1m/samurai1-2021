import React, { useEffect } from 'react'
import Paginator from '../common/Paginator'
import { User } from './User'
import { UsersSearchForm } from './UserSearchForm'
import { FilterType, requestUsersThunk, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
	getCurrentPage,
	getFollowingProgress,
	getPageSize,
	getTotalCount,
	getUsers,
	getUsersFilter,
} from '../../redux/usersSelectors'
import * as queryString from 'querystring'

import style from './Users.module.css'

type PropsType = {}
type QueryParamsType = {
	term?: string
	page?: string
	friend?: string
}

export const Users: React.FC<PropsType> = (props) => {
	// const state = useSelector(state => state.state)
	const dispatch = useDispatch()
	const history = useHistory()

	const users = useSelector(getUsers)
	const totalCount = useSelector(getTotalCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingProgress)

	useEffect(() => {
		const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType
		let actualPage = currentPage
		let actualFilter = filter

		if (!!parsed.page) actualPage = Number(parsed.page)

		if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

		switch (parsed.friend) {
			case 'null':
				actualFilter = { ...actualFilter, friend: null }
				break
			case 'false':
				actualFilter = { ...actualFilter, friend: false }
				break
			case 'true':
				actualFilter = { ...actualFilter, friend: true }
				break
		}

		dispatch(requestUsersThunk(actualPage, pageSize, actualFilter))
	}, [])

	useEffect(() => {
		const query: QueryParamsType = {}
		if (!!filter.term) query.term = filter.term
		if (filter.term !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)

		history.push({
			pathname: '/developers',
			search: queryString.stringify(query),
			// search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
		})
	}, [filter, currentPage])

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
