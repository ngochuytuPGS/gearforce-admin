import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducer';

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'root',
  storage,
};

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export function configureStore(preloadedState: {}) {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
