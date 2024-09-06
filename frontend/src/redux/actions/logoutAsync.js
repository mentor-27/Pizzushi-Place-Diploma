import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const logoutAsync = navigate => async dispatch => {
	await Api.auth.logout();
	localStorage.clear();
	dispatch({ type: ACTION_TYPE.CLEAR_USER });
	dispatch({ type: ACTION_TYPE.CLEAR_USERS });
	dispatch({ type: ACTION_TYPE.CLEAR_CART });
	navigate('/');
};
