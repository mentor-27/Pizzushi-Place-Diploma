// import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialCartState = {
	products: [],
	totalPrice: 0,
	// ...(await Api.cart.get()).data,
	loading: true,
};

export const cartReducer = (state = initialCartState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_CART:
			return {
				products: payload.products || state.products,
				totalPrice: payload.totalPrice || state.totalPrice,
				loading: false,
			};
		default:
			return state;
	}
};
