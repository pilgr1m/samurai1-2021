import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"
import Dialogs from "./components/Dialogs/Dialogs"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import News from "./components/News/News"
import './App.css'

const App = () => {
	return (
		<Router>
			<div className="app-wrapper">
				<Header />
				<Navbar />
				<div className="content">
					<Route exact path="/dialogs" component={Dialogs} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/news" component={News} />
					<Route exact path="/" component={Profile} />
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
