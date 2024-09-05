import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const clearCartAsync = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
	try {
		const { error } = await Api.cart.clear();
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.CLEAR_CART });
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
		toast.error(e.message);
	}
};
