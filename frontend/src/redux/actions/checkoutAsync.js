import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const checkoutAsync = (orderData, reset, navigate) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
	try {
		const { error } = await Api.cart.checkout(orderData);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.CLEAR_CART });
		toast.success('Ваш заказ принят');
		reset();
		navigate('/');
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
		toast.error(e.message);
	}
};
