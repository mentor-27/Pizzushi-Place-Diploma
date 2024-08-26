import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const addCartItemAsync =
	(productId, quantity = 1) =>
	async dispatch => {
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
		const { data, error } = await Api.cart.add(productId, quantity);
		if (error) {
			throw new Error(error);
		}
		dispatch({ type: ACTION_TYPE.SET_CART, payload: data });
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
	};
