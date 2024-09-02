import toast from 'react-hot-toast';

import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const setProductsAsync = (sortBy, sortOrder) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: true });
	const {
		data: { products },
		error,
	} = await Api.products[sortBy && sortOrder ? 'getPaginated' : 'get'](sortBy, sortOrder);
	if (error) {
		toast.error(error);
		dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: false });
		return;
	}
	dispatch({ type: ACTION_TYPE.SET_PRODUCTS, payload: products });
};
