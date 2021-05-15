import React from 'react'
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader"

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }


    activateEditMode = () => {
        this.setState({
            editMode: true,

        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        console.log("status change")
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        console.log("render")
        return (
            <>
                status :
                {this.state.editMode
                    ? <div>
                        <input
                            ref={this.statusInput}
                            onBlur={this.deactivateEditMode}
                            autoFocus={true}
                            className={style.inputStatus}
                            defaultValue={this.props.status}
                            onChange={this.onStatusChange}
                        />
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "no status"}</span>
                    </div>
                }
            </>
        )
    }

}

export default ProfileStatus
