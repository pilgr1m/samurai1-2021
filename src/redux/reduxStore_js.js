import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { profileReducer } from './profileReducer'
import { dialogsReducer } from './dialogsReducer'
import { usersReducer } from "./usersReducer"
import { authReducer } from "./authReducer"
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer';

const reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
// - const store = createStore(reducer, /* preloadedState, */ compose(
// 	applyMiddleware(...middleware)
// ));

// const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window._store_ = store

export default store