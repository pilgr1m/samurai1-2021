import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"
import Dialogs from "./components/Dialogs/Dialogs"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css'


const App = (props) => {

	return (
		<Router>
			<div className="app-wrapper">
				<Header />
				<Navbar />
				<div className="content">

					<Route path="/dialogs" >
						<Dialogs state={props.state.dialogsPage} />
					</Route>

					<Route path="/profile" >
						<Profile state={props.state.profilePage} />
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
		</Router>

	)
}
export default App
