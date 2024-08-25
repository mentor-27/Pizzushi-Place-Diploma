import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const removeCartItemAsync = id => async dispatch => {
	const { data, error } = await Api.cart.remove(id);
	if (error) {
		throw new Error(error);
	}
	dispatch({ type: ACTION_TYPE.SET_CART, payload: data });
};
