import toast from 'react-hot-toast';

import { ROLES_AUTH_NUMBERS } from '../../consts';
import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const loginAsync = (authData, navigate) => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: true });
	try {
		const { data, cart, roles, users, error } = await Api.auth.login(authData);

		if (error) {
			localStorage.clear();
			dispatch({ type: ACTION_TYPE.CLEAR_USERS });
			dispatch({ type: ACTION_TYPE.CLEAR_CART });
			dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: false });
			return toast.error(error);
		}

		localStorage.setItem('accessToken', data.accessToken);
		localStorage.setItem('roleId', data.roleId);
		localStorage.setItem('isAuth', ROLES_AUTH_NUMBERS.includes(data.roleId));

		dispatch({
			type: ACTION_TYPE.SET_USER,
			payload: data,
		});
		dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: false });

		if (cart) {
			dispatch({ type: ACTION_TYPE.SET_CART, payload: cart });
		}

		if (roles && users) {
			dispatch({ type: ACTION_TYPE.SET_ROLES, payload: roles });
			dispatch({ type: ACTION_TYPE.SET_USERS, payload: users });
		}

		navigate(-1);
	} catch (e) {
		dispatch({ type: ACTION_TYPE.SET_APP_LOADING, payload: false });
		toast.error(e.message);
	}
};
