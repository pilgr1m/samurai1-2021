import React, { Suspense } from "react"
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
// import ProfileContainer from "./components/Profile/ProfileContainer"
import UsersContainer from "./components/Users/UsersContainer"
import { Route, Switch } from "react-router-dom"
import Login from "./components/Login/Login"
import { connect } from "react-redux"
import { initializeApp } from "./redux/appReducer"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import Preloader from "./components/common/Preloader"
import { compose } from "redux"
import store from './redux/reduxStore'
import ProfileContainer from "./components/Profile/ProfileContainer"

import './App.css'

// import withSuspense from "./components/hoc/withSuspense"
// const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className="app-wrapper">
				<HeaderContainer />
				<Navbar />
				<div className="content">

					<Route path="/profile/:userId?" >
						<ProfileContainer />
					</Route>
					{/* <Route path="/profile/:userId?" >
						{withSuspense(ProfileContainer)}
					</Route> */}

					<Route path="/dialogs" >
						<DialogsContainer />
					</Route>

					<Route path="/users" >
						<UsersContainer />
					</Route>

					<Route path="/login" >
						<Login />
					</Route>

				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized })

const AppContainer = compose(
	connect(mapStateToProps, { initializeApp }))(App)

const SamuraiJSApp = (props) => {
	return <Router >
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</Router>
}
export default SamuraiJSApp


