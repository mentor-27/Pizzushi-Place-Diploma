import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialProductsState = {
	products: [],
	...(await Api.products.get()),
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
		case ACTION_TYPE.EDIT_PRODUCT: {
			const idx = state.products.findIndex(product => product.id === payload.id);
			return {
				...state,
				products: state.products.with(idx, payload),
				loading: false,
			};
		}
		case ACTION_TYPE.ADD_PRODUCT: {
			return {
				...state,
				products: [...state.products, payload],
				loading: false,
			};
		}
		case ACTION_TYPE.DELETE_PRODUCT: {
			return {
				...state,
				products: state.products.filter(product => product.id !== payload),
				loading: false,
			};
		}
		default:
			return state;
	}
};
