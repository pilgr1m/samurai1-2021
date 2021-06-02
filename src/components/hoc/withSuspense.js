import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props} />
        </Suspense>
    }
}
export default withSuspense
