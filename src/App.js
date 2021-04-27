import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import { Route, Switch } from "react-router-dom"

import './App.css'


const App = (props) => {

	return (
		<div className="app-wrapper">
			<Header />
			<Navbar />
			<div className="content">

				<Route path="/profile" >
					<Profile />
				</Route>

				<Route path="/dialogs" >
					<DialogsContainer />
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
