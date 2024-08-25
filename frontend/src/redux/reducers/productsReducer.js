import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialProductsState = {
	products: (await Api.products.get()).data.products,
	loading: false,
};

export const productsReducer = (state = initialProductsState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return {
				products: payload,
				loading: false,
			};
		case ACTION_TYPE.SET_PRODUCTS_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return state;
	}
};
