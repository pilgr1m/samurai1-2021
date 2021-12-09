import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Avatar, Row, Col, Layout, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import style from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectCurrentUserLogin } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'

export const Header: React.FC = () => {
	const { Header } = Layout

	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectCurrentUserLogin)

	return (
		<Header className='header'>
			<Row>
				<Col span={3}>
					<div className='logo'>
						<span className={style.spanHeader}>L</span> .
						<span className={style.spanHeader}>O</span> .
						<span className={style.spanHeader}>G</span> .
						<span className={style.spanHeader}>O</span>
					</div>
				</Col>
				<Col span={15}>
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
						<Menu.Item key='1'>
							<Link to='/developers'>Developers</Link>
						</Menu.Item>
					</Menu>
				</Col>

				{isAuth ? (
					<>
						<Col span={3}>
							<Avatar
								style={{ backgroundColor: '#87d068' }}
								icon={<UserOutlined />}
							/>
							<span
								style={{
									color: 'yellow',
									margin: '6px',
								}}>
								{login}
							</span>
						</Col>
						<Col span={3}>
							<Button onClick={() => dispatch(logout())}>Logout</Button>
						</Col>
					</>
				) : (
					<Col span={6}>
						<Button>
							<NavLink to={'/login'}>Login</NavLink>
						</Button>
					</Col>
				)}
			</Row>
		</Header>
	)
}
