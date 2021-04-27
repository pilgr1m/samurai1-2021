import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import store from './redux/reduxStore'


let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <Router >

                <Provider store={store}>
                    <App />
                </Provider>

            </Router>
        </React.StrictMode>,
        document.getElementById('root')
    )
}
rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})

