import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../redux/types'
import { FilterType } from '../../redux/usersReducer'

import url from '../images/photoUrl.webp'
import style from './Users.module.css'

type PropsType = {
	user: UserType
	followingInProgress: Array<number>
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
	return (
		<div className={style.userWrapper}>
			<span className={style.left}>
				<div>
					<NavLink to={`/profile/${user.id}`}>
						<img
							className={style.photo}
							src={user.photos.small === null ? url : user.photos.small}
							alt='userPhoto'
						/>
					</NavLink>
				</div>
				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.some((id) => id === user.id)}
							className={style.btnUsers}
							onClick={() => unfollow(user.id)}>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.some((id) => id === user.id)}
							className={style.btnUsers}
							onClick={() => follow(user.id)}>
							Follow
						</button>
					)}
				</div>
			</span>

			<span className={style.right}>
				<span>
					<div>
						<span className={style.spanLeft}>Name:</span>{' '}
						<span className={style.spanRight}>{user.name}</span>
					</div>
					<div>
						<span className={style.spanLeft}>Status:</span>{' '}
						<span className={style.spanRight}>{`${user.status}`}</span>
					</div>
					<div>
						<span className={style.spanLeft}>UserId:</span>{' '}
						<span className={style.spanRight}>{user.id}</span>
					</div>
				</span>
			</span>
		</div>
	)
}
export default User
