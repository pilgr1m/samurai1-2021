import React from 'react'

import style from '../Users/Users.module.css'


const Paginator = ({ totalCount, pageSize, onPageChange, currentPage }) => {
	let pagesCount = Math.ceil(totalCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div className={style.pagination}>
		{pages.map((page, index) => {
			return <span
				key={index}
				className={currentPage === page ? style.selectedPage : ""}
				onClick={() => { onPageChange(page) }}
			>
				{page}
			</span>
		})}
	</div>
}

export default Paginator
