import axios from 'axios'
import React from 'react'
import url from '../images/photoUrl.webp'
import style from './Users.module.css'


const Users = (props) => {

	if (props.users.length === 0 && props.totalCount === 0) {

		axios.get("https://social-network.samuraijs.com/api/1.0/users")
			.then(response => {
				// debugger
				console.log(response.data)
				console.log(response.data.totalCount)
				props.setUsers(response.data.items)
				props.setTotalUsers(response.data.totalCount)
			})
	}
	console.log(props.totalCount)


	return (
		<div className={style.usersBlock}> Total users: {props.totalCount}
			{props.users.map(user => {
				return <div key={user.id} className={style.usersWrapper}>
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
									onClick={() => props.unfollow(user.id)}>
									Unfollow</button>
								: <button
									className={style.btn}
									onClick={() => props.follow(user.id)}>
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
								<span className={style.spanLeft}>Id:</span> <span className={style.spanRight}>{user.id}</span>
							</div>
						</span>
					</span>
				</div>
			})}
		</div>
	)
}
export default Users
