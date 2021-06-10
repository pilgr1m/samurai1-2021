import React, { useEffect, useState } from 'react'
import style from "./ProfileInfo.module.css"

const ProfileStatus = (props) => {
	// debugger
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	const onStatusChange = (e) => {
		console.log("status change")
		setStatus(e.currentTarget.value)
	}

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

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
