import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import debounce from 'lodash.debounce'
import { combineReducers } from 'redux'
import data from './modules/reducers'


var CACHE_NAME = 'notification-experiment';

const persistState = debounce(state => {
  localStorage.setItem(CACHE_NAME, JSON.stringify(state));
},500)

export const persist = store => next => action => {
  next(action)
  persistState(store.getState())
}

const cachedState = window.localStorage.getItem(CACHE_NAME)
const useCache = !navigator.onLine && cachedState
const initialState = useCache ? JSON.parse(cachedState) : rootReducer

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

const composedEnhancers = compose(
  applyMiddleware(...middleware, persist),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

export default store
