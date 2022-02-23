import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer'

// Settings redux middlewares (for async actions) and Redux DevTools
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

// All reducers (put here)
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
})

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)
