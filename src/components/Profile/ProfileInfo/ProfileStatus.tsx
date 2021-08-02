import React, { ChangeEvent, useEffect, useState } from 'react'
import style from "./ProfileInfo.module.css"

type PropsType = {
	statusProp: string
	updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ updateStatus, statusProp }) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(statusProp)

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		updateStatus(status)
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("status change")
		setStatus(e.currentTarget.value)
	}

	useEffect(() => {
		setStatus(statusProp)
	}, [statusProp])

	return (
		<>
			status: -
			{editMode
				? <div>
					<input
						className={style.inputStatus}
						onBlur={deactivateEditMode}
						autoFocus={true}
						defaultValue={status}
						onChange={onStatusChange}
					/>
				</div>
				: <div style={{ display: "inline-block" }}>
					<span onDoubleClick={activateEditMode}>  {status || "no status"}</span>
				</div>
			}
		</>
	)
}

export default ProfileStatus
