import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// reducers
import auth from './reducers/auth';
import products from './reducers/products';
import cart from './reducers/cart';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['currentUser', 'cart'],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
  products,
  cart: persistReducer(persistConfig, cart),
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
