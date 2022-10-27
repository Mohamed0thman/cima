import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

import { apiMiddleware } from './middlewares';

const middleware = [thunk];

const compseEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  compseEnhacers(applyMiddleware(...middleware, apiMiddleware))
);
export default { store };
