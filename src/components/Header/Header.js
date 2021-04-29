import React from 'react'
import style from "./Header.module.css"


const Header = () => {
  return (
    <header className={style.header}>
      <span className={style.spanHeader}>L</span> .
      <span className={style.spanHeader}>O</span> .
      <span className={style.spanHeader}>G</span> .
      <span className={style.spanHeader}>O</span>
    </header>
  )
}

export default Header
