import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const addProductAsync = (productData, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: true });
	try {
		const { data, error } = await Api.products.add(productData);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.ADD_PRODUCT, payload: data });
		toast.success('Товар добавлен');
		close();
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
		toast.error(e.message);
	}
};
