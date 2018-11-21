import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import createMiddleware from './clientMiddleware';

export default function configureStore(history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const logger = createLogger({ collapsed: true });
  const middleware =
    (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) ?
      [createMiddleware(), logger, reduxRouterMiddleware] :
      [createMiddleware(), reduxRouterMiddleware];

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
