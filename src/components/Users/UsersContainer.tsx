import React from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import Preloader from '../common/Preloader'
import { getIsFetching } from '../../redux/usersSelectors'

type UserPagePropsType = { pageTitle: string }

export const UserPage: React.FC<UserPagePropsType> = (props) => {
	const isFetching = useSelector(getIsFetching)

	return (
		<>
			<h4>{props.pageTitle}</h4>
			{isFetching ? <Preloader /> : null}
			<Users />
		</>
	)
}
