import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';
import toast from 'react-hot-toast';

export const deleteUserAsync = (id, close) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_USERS_LOADING, payload: true });
	const { data, error } = await Api.users.deleteUser(id);
	if (error) {
		toast.error(error);
		dispatch({ type: ACTION_TYPE.SET_USERS_LOADING, payload: false });
		return;
	}
	if (!data?.deletedCount) return toast('Пользователь не найден', { icon: '⚠' });
	dispatch({ type: ACTION_TYPE.DELETE_USER, payload: id });
	toast.success('Пользователь удален');
	close();
};
