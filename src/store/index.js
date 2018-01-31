import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import debounce from 'lodash.debounce'
import { combineReducers } from 'redux'
import data from './modules/reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// var CACHE_NAME = 'notification-experiment';
//
// const persistState = debounce(state => {
//   localStorage.setItem(CACHE_NAME, JSON.stringify(state));
// },500)
//
// export const persist = store => next => action => {
//   next(action)
//   persistState(store.getState())
// }
//
// const cachedState = window.localStorage.getItem(CACHE_NAME)
// const useCache = !navigator.onLine && cachedState
// const initialState = useCache ? JSON.parse(cachedState) : rootReducer

// ABOVE ^

// console.log("window.localStorage",window.localStorage)
// // const reducers =
// console.log("JSON.parse(cachedState)",JSON.parse(cachedState), useCache)
//
// console.log("initialState",combineReducers({data: initialState}))
// console.log("combineReducers: ",combineReducers({data: data}))
// console.log("rootReducer: ",rootReducer)
export const history = createHistory()

const enhancers = []
const logger = store => next => action => {
  let result = next(action)
  // console.log(store.getState())
  return result
}

const middleware = [
  thunk,
  routerMiddleware(history),
  logger
]

const persistConfig = {
  key: 'root',
  storage: storage,
}
// const persistedReducer = persistReducer(persistConfig, rootReducer)


// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }



const composedEnhancers = compose(
  // applyMiddleware(...middleware, persist),
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)
// const store = createStore(
//   persistedReducer
// )


// export const persistor = persistStore(store)
export default store
