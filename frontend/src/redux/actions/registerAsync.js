import toast from 'react-hot-toast';

import { ROLES_AUTH_NUMBERS } from '../../consts';
import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const registerAsync = (regData, navigate) => async dispatch => {
	const { data, cart, error } = await Api.auth.register(regData);

	if (error) {
		return toast.error(error);
	}

	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('roleId', data.roleId);
	localStorage.setItem('isAuth', ROLES_AUTH_NUMBERS.includes(data.roleId));

	dispatch({ type: ACTION_TYPE.SET_USER, payload: data });

	if (cart) {
		dispatch({ type: ACTION_TYPE.SET_CART, payload: cart });
	}

	toast.success('Успешная регистрация');
	navigate('/');
};
