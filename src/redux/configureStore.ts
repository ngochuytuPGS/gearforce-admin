import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createRootReducer } from './reducer';

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const history = createBrowserHistory();

export function configureStore(preloadedState: {}) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history))),
  );

  return store;
}
