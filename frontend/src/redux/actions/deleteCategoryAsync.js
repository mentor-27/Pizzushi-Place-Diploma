import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const deleteCategoryAsync = (id, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: true });
	try {
		const { data, error } = await Api.categories.remove(id);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: false });
			return;
		}
		if (!data?.deletedCount) return toast('Категория не найдена', { icon: '⚠' });
		dispatch({ type: ACTION_TYPE.DELETE_CATEGORY, payload: id });
		toast.success('Категория удалена');
		close();
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: false });
		toast.error(e.message);
	}
};
