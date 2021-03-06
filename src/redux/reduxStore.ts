import { Action, applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { profileReducer } from './profileReducer'
import { dialogsReducer } from './dialogsReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'
import { ThunkAction } from "redux-thunk"



const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

type RooTReducerType = typeof rootReducer
export type AppStateType = ReturnType<RooTReducerType>


// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// - const store = createStore(reducer, /* preloadedState, */ compose(
// 	applyMiddleware(...middleware)
// ));

// const store = createStore(reducers, applyMiddleware(thunkMiddleware))
//@ts-ignore
window._store_ = store

export default store