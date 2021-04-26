import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"
import Dialogs from "./components/Dialogs/Dialogs"
import { Route, Switch } from "react-router-dom"
import './App.css'


const App = (props) => {

	return (
		<div className="app-wrapper">
			<Header />
			<Navbar />
			<div className="content">

				<Route path="/profile" >
					<Profile
						profilePage={props.state.profilePage}
						dispatch={props.dispatch}
					/>
				</Route>

				<Route path="/dialogs" >
					<Dialogs
						dialogsPage={props.state.dialogsPage}
						dispatch={props.dispatch}
					/>
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
