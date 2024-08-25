import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const setProductsAsync =
	(page, limit, categoryId, sortBy, sortOrder) => async dispatch => {
		dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING, payload: true });
		const {
			data: { products, lastPage },
			error,
		} = await Api.products[
			(page && limit) || (sortBy && sortOrder) ? 'getPaginated' : 'get'
		](page, limit, categoryId, sortBy, sortOrder);
		if (error) {
			throw new Error(error);
		}
		dispatch({ type: ACTION_TYPE.SET_PRODUCTS, payload: products });
		dispatch({ type: ACTION_TYPE.SET_LAST_PAGE, payload: lastPage });
	};
