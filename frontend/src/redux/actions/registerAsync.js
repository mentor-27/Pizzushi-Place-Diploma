import toast from 'react-hot-toast';

import { ROLES_AUTH_NUMBERS } from '../../consts';
import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const registerAsync = (regData, navigate) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: true });
	try {
		const { data, cart, error } = await Api.auth.register(regData);

		if (error) {
			localStorage.clear();
			return toast.error(error);
		}

		localStorage.setItem('accessToken', data.accessToken);
		localStorage.setItem('roleId', data.roleId);
		localStorage.setItem('isAuth', ROLES_AUTH_NUMBERS.includes(data.roleId));

		dispatch({ type: ACTION_TYPE.SET_USER, payload: data });
		dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: false });

		if (cart) {
			dispatch({ type: ACTION_TYPE.SET_CART, payload: cart });
		}

		toast.success('Успешная регистрация');
		navigate('/');
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: false });
		toast.error(e.message);
	}
};
