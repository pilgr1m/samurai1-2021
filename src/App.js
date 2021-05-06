import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import UsersContainer from "./components/Users/UsersContainer"
import { Route, Switch } from "react-router-dom"

import './App.css'




const App = (props) => {

	return (
		<div className="app-wrapper">
			<HeaderContainer />
			<Navbar />
			<div className="content">

				<Route path="/profile/:userId?" >
					<ProfileContainer />
				</Route>

				<Route path="/dialogs" >
					<DialogsContainer />
				</Route>

				<Route path="/users" >
					<UsersContainer />
				</Route>

			</div>

			{/* <Switch>
					<Route path="/dialogs">
						<Dialogs />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/news">
						<News />
					</Route>
				</Switch> */}
		</div>
	)
}
export default App
