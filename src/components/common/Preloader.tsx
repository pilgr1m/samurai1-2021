import React from 'react'
import loader from '../images/isFetching.svg'


const Preloader: React.FC = () => {
    return (
        <div>
            <img src={loader} alt="loading" />
        </div>
    )
}

export default Preloader
