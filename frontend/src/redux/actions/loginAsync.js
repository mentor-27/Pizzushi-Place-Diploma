import toast from 'react-hot-toast';

import { ROLES_AUTH_NUMBERS } from '../../consts';
import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const loginAsync = (authData, navigate) => async dispatch => {
	const { data, cart, roles, users, error } = await Api.auth.login(authData);

	if (error) {
		return toast.error(error);
	}

	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('roleId', data.roleId);
	localStorage.setItem('isAuth', ROLES_AUTH_NUMBERS.includes(data.roleId));

	dispatch({
		type: ACTION_TYPE.SET_USER,
		payload: data,
	});

	if (cart) {
		dispatch({ type: ACTION_TYPE.SET_CART, payload: cart });
	}

	if (roles && users) {
		dispatch({ type: ACTION_TYPE.SET_ROLES, payload: roles });
		dispatch({ type: ACTION_TYPE.SET_USERS, payload: users });
	}

	navigate(-1);
};
