import toast from 'react-hot-toast';

import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const setCategoriesAsync = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: true });
	const { data, error } = await Api.categories.get();
	if (error) {
		toast.error(error);
		dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: false });
		return;
	}
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES, payload: data });
};
