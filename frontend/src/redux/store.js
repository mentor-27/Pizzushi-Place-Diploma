import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import {
	appReducer,
	cartReducer,
	usersReducer,
	productsReducer,
	categoriesReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	cart: cartReducer,
	users: usersReducer,
	products: productsReducer,
	categories: categoriesReducer,
});

const composeEnhancers =
	(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
	compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
