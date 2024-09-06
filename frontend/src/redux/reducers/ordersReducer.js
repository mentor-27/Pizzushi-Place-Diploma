import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialOrdersState = {
	orders:
		(JSON.parse(localStorage.getItem('isAuth')) && (await Api.orders.get()).data) || [],
	loading: false,
};

export const ordersReducer = (state = initialOrdersState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_ORDERS:
			return {
				orders: payload,
				loading: false,
			};
		case ACTION_TYPE.SET_ORDERS_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return state;
	}
};
