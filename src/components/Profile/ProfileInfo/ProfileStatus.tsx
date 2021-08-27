import React, { ChangeEvent, useEffect, useState } from 'react'
import style from "./ProfileInfo.module.css"

type PropsType = {
	status: string
	updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ updateStatus, status }) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [statusState, setStatusState] = useState(status)

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		updateStatus(statusState)
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("status change")
		setStatusState(e.currentTarget.value)
	}

	useEffect(() => {
		setStatusState(status)
	}, [status])

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
