import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// const withAuthRedirect = (Component) => {
//     const RedicrectComponent = (props) => {
//         if (!this.props.isAuth) return <Redirect to="/login" />
//         return <Component {...props} />
//     }
//     return RedicrectComponent
// }
// export default withAuthRedirect

const mapStateToPropsRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

const withAuthRedirect = (Component) => {
    class RedicrectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login" />
            return <Component {...this.props} />
        }
    }
    const ConnectedAuthRedirect = connect(mapStateToPropsRedirect)(RedicrectComponent)
    return ConnectedAuthRedirect
}
export default withAuthRedirect
