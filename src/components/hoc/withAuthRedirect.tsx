import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'

// const withAuthRedirect = (Component) => {
//     const RedicrectComponent = (props) => {
//         if (!this.props.isAuth) return <Redirect to="/login" />
//         return <Component {...props} />
//     }
//     return RedicrectComponent
// }
// export default withAuthRedirect

// const withAuthRedirect = (WrappedComponent: React.ComponentType<WCP>) => {
//     class RedicrectComponent extends React.Component {
//         render() {
//             if (!this.props.isAuth) return <Redirect to="/login" />
//             return <WrappedComponent {...this.props} />
//         }
//     }

//     const ConnectedAuthRedirect = connect(mapStateToPropsRedirect)(RedicrectComponent)

//     return ConnectedAuthRedirect
// }

let mapStateToProps = (state: AppStateType) => ({ isAuth: state.auth.isAuth } as MapPropsType)

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedicrectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to="/login" />

        return <WrappedComponent {...restProps as WCP} />
    }

    const ConnectedAuthRedirect = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToProps, {})
        (RedicrectComponent)

    return ConnectedAuthRedirect
}
export default withAuthRedirect
