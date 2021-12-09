import React, { Suspense } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { LoginPage } from './components/Login/Login'
import { UserPage } from './components/Users/UsersContainer'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Preloader from './components/common/Preloader'
import { compose } from 'redux'
import store, { AppStateType } from './redux/reduxStore'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import { Header } from './components/Header/Header'
import withSuspense from './components/hoc/withSuspense'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import style from './components/Navbar/Navbar.module.css'

import './App.css'

import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

// import withSuspense from "./components/hoc/withSuspense"
// const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
type PropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
	initializeApp: () => void
}
const SuspendedDialog = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

class App extends React.Component<PropsType & DispatchPropsType> {
	componentDidMount() {
		this.props.initializeApp()
	}
	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}
		return (
			<Layout>
				<Header />
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className='site-layout-background' style={{ padding: '24px 0' }}>
						<Sider className='site-layout-background' width={200}>
							<Menu
								mode='inline'
								defaultSelectedKeys={['1']}
								// defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}>
								<SubMenu key='sub1' icon={<UserOutlined />} title='My Profile'>
									<Menu.Item key='1'>
										<Link to='/profile'>Profile</Link>
									</Menu.Item>
									<Menu.Item key='2'>
										<Link to='/dialogs'>Dialogs</Link>
									</Menu.Item>
								</SubMenu>

								<SubMenu key='sub2' icon={<LaptopOutlined />} title='Developers'>
									<Menu.Item key='3'>
										<Link to='/developers'>Developers</Link>
									</Menu.Item>
								</SubMenu>

								<SubMenu
									key='sub3'
									icon={<NotificationOutlined />}
									title='subnav 3'>
									<Menu.Item key='4'>option9</Menu.Item>
									<Menu.Item key='5'>option10</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							<Switch>
								<Redirect exact from='/' to='/profile' />
								{/* <Route path="/profile/:userId?" >
							{<ProfileContainer />}
						</Route> */}
								<Route
									path='/profile/:userId?'
									render={() => <SuspendedProfile />}
								/>

								{/* <Route path="/dialogs" >
			 				<DialogsContainer />
					</Route> */}

								<Route path='/dialogs' render={() => <SuspendedDialog />} />

								<Route path='/developers'>
									<UserPage pageTitle={'Users'} />
								</Route>

								<Route exact path='/login'>
									<LoginPage />
								</Route>

								<Route path='*'>
									<div>404 NOT FOUND </div>
								</Route>
							</Switch>
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}> Footer Design ©2021 by Ivan V </Footer>
			</Layout>
			// <div className='app-wrapper'>
			// 	<HeaderContainer />
			// 	<Navbar />
			// 	<div className='content'>
			// 		<Switch>
			// 			<Redirect exact from='/' to='/profile' />
			// 			{/* <Route path="/profile/:userId?" >
			// 				{<ProfileContainer />}
			// 			</Route> */}
			// 			<Route path='/profile/:userId?' render={() => <SuspendedProfile />} />

			// 			{/* <Route path="/dialogs" >
			// 				<DialogsContainer />
			// 			</Route> */}

			// 			<Route path='/dialogs' render={() => <SuspendedDialog />} />

			// 			<Route path='/users'>
			// 				<UserPage pageTitle={'Users'} />
			// 			</Route>

			// 			<Route exact path='/login'>
			// 				<LoginPage />
			// 			</Route>

			// 			<Route path='*'>
			// 				<div>404 NOT FOUND </div>
			// 			</Route>
			// 		</Switch>
			// 	</div>
			// </div>
		)
	}
}

const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized })

const AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp: React.FC = () => {
	return (
		<Router>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</Router>
	)
}

export default SamuraiJSApp
