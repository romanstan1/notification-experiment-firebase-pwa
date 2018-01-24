import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'

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
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

export default store
