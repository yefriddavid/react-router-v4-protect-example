import { createStore, applyMiddleware, compose } from 'redux'
import combinedReducers from '../reducers/combinedReducers'
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from '../sagas/sagaMonitor'
import rootSaga from '../sagas/index.js'
import { loadState, saveState } from './sessionStorage'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from '../history/browserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { routesMiddleware } from '../http/Middlewares/routesMiddleware'


const composeEnhancers = composeWithDevTools({  })


export default function configureStore(initialState, browserHistory) {
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  const persistedState = loadState()
  const routermw = routerMiddleware(browserHistory)
  const store = createStore(
                          combinedReducers,
                          persistedState,
                          compose(
                            applyMiddleware(routesMiddleware),
                            composeEnhancers(applyMiddleware(sagaMiddleware))
                          )
  );
  sagaMiddleware.run(rootSaga)
  store.subscribe(() => {
    saveState(store.getState())
  })
  return store
}

