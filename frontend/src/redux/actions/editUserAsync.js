import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const editUserAsync = (id, userData, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_USERS_LOADING, payload: true });
	try {
		const { data, error } = await Api.users.editUser(id, userData);
		if (error) {
			toast.error(error);
			dispatch({ type: ACTION_TYPE.SET_USERS_LOADING, payload: false });
			return;
		}
		dispatch({ type: ACTION_TYPE.EDIT_USER, payload: data });
		toast.success('Изменения сохранены');
		close();
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_USERS_LOADING, payload: false });
		toast.error(e.message);
	}
};
