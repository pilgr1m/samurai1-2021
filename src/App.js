import Technologies from "./Technologies"
import Header from "./components/Header"
import Footer from "./Footer"

import './App.css'
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"


const App =() => {
  	return (
    	<div className="app-wrapper">
				<Header />
				<Navbar />
				<Profile />
			</div>
  	)
}
export default App
