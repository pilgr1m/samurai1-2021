import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import store from './redux/reduxStore'


let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <Router >
                <App
                    state={state}
                    dispatch={store.dispatch.bind(store)}
                />
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

