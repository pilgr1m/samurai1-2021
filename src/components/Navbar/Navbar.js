import React from 'react'
import { NavLink } from "react-router-dom"
import style from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={style.nav}>

            <div className={style.item}>
                <NavLink to="/profile" activeClassName={style.activeLink}>
                    Profile
                </NavLink>
            </div>

            <div className={style.item}>
                <NavLink to="/dialogs" activeClassName={style.activeLink}>
                    Dialogs
                </NavLink>
            </div>

        </nav>
    )
}

export default Navbar
