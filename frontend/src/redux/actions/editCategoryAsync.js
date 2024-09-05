import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const editCategoryAsync = (id, categoryData, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: true });
	try {
		const { data, error } = await Api.categories.editCategory(id, categoryData);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.EDIT_CATEGORY, payload: data });
		toast.success('Изменения сохранены');
		close();
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: false });
		toast.error(e.message);
	}
};
