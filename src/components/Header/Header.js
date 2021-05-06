import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "./Header.module.css"


const Header = ({ login, isAuth }) => {
	return (
		<header className={style.header}>
			<div className={style.logo}>
				<span className={style.spanHeader}>L</span> .
				<span className={style.spanHeader}>O</span> .
				<span className={style.spanHeader}>G</span> .
				<span className={style.spanHeader}>O</span>
			</div>

			<div className={style.login}>
				{isAuth
					? <span>{login}</span>
					: <NavLink to={"/login2"}>
						Login
				</NavLink>
				}

			</div>
		</header>
	)
}

export default Header
