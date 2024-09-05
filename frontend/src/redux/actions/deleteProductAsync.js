import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const deleteProductAsync = (id, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: true });
	try {
		const { data, error } = await Api.products.remove(id);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
			return;
		}
		if (!data?.deletedCount) {
			dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
			toast('Товар не найден', { icon: '⚠' });
			return;
		}
		dispatch({ type: ACTION_TYPE.DELETE_PRODUCT, payload: id });
		toast.success('Товар удален');
		close();
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
		toast.error(e.message);
	}
};
