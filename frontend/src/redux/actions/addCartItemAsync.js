import toast from 'react-hot-toast';

import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const addCartItemAsync =
	(productId, quantity = 1, name) =>
	async dispatch => {
		dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: true });
		try {
			const { data, error } = await Api.cart.add(productId, quantity);
			if (error) {
				toast.error(error);
				dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
				return;
			}
			dispatch({ type: ACTION_TYPE.SET_CART, payload: data });
			toast.success(`${quantity} ед. ${name || 'товара'} добавлено в корзину`);
		} catch (e) {
			dispatch({ type: ACTION_TYPE.SET_CART_LOADING, payload: false });
			toast.error(e.message);
		}
	};
