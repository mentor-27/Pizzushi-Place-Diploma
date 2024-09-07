import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const deleteOrderAsync = id => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: true });
	try {
		const { data, error } = await Api.orders.remove(id);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: false });
			return;
		}

		if (!data?.deletedCount) {
			dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: false });
			toast('Заказ не найден', { icon: '⚠' });
			return;
		}

		dispatch({ type: ACTION_TYPE.DELETE_ORDER, payload: id });
		toast.success('Заказ удален');
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: false });
		toast.error(e.message);
	}
};
