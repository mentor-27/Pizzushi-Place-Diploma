import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const setCartEmpty = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
	const { error } = await Api.cart.clear();
	if (error) {
		throw new Error(error);
	}
	dispatch({ type: ACTION_TYPE.SET_CART_EMPTY });
};
