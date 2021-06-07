import React, { Suspense } from 'react'


const withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props} />
        </Suspense>
    }
}
export default withSuspense
