import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const getOrdersAsync = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: true });
	try {
		const { data, error } = await Api.orders.get();
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.SET_ORDERS, payload: data });
		toast.success('Список заказов обновлен');
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING, payload: false });
		toast.error(e.message);
	}
};
