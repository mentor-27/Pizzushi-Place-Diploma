import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialCartState = {
	products: [],
	totalPrice: 0,
	...(await Api.cart.get()),
	loading: false,
};

export const cartReducer = (state = initialCartState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_CART:
			return {
				products: payload.products,
				totalPrice: payload.totalPrice,
				loading: false,
			};
		case ACTION_TYPE.SET_CART_LOADING:
			return {
				...state,
				loading: payload,
			};
		case ACTION_TYPE.CLEAR_CART:
			return {
				products: [],
				totalPrice: 0,
				loading: false,
			};
		default:
			return state;
	}
};
