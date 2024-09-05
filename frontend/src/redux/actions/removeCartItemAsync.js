import toast from 'react-hot-toast';

import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const removeCartItemAsync = id => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
	try {
		const { data, error } = await Api.cart.remove(id);
		if (error) {
			return toast.error(error);
		}
		dispatch({ type: ACTION_TYPE.SET_CART, payload: data });
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
		toast.error(e.message);
	}
};
