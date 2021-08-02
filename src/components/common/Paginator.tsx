import React, { useState } from 'react'

import style from './Paginator.module.css'

type PropsType = {
	totalCount: number
	pageSize: number
	currentPage: number
	portionSize?: number
	onPageChange: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({ totalCount, pageSize, onPageChange, currentPage, portionSize = 10 }) => {

	let pagesCount = Math.ceil(totalCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	const portionCount = Math.ceil(pagesCount / portionSize)
	const [portionNumber, setPortionNumber] = useState(1)
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	const rightPortionPageNumber = portionNumber * portionSize


	return <div className={style.pagination}>
		{portionNumber > 1 &&
			<button
				className={style.btnPagi}
				onClick={() => { setPortionNumber(portionNumber - 1) }}
			>
				&lt; PREV </button>
		}

		{
			pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
				return <span
					key={p}
					className={currentPage === p ? style.selectedPage : style.page}
					onClick={() => { onPageChange(p) }}
				>
					{p}
				</span>
			})
		}


		{portionCount > portionNumber &&
			<button
				className={style.btnPagi}
				onClick={() => { setPortionNumber(portionNumber + 1) }}
			>
				NEXT &gt; </button>
		}
	</div>
}

export default Paginator
