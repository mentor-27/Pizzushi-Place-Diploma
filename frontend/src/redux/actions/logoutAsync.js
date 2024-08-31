import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from './actionTypes';

export const logoutAsync = navigate => async dispatch => {
	localStorage.clear();
	await Api.auth.logout();
	dispatch({ type: ACTION_TYPE.CLEAR_USER });
	dispatch({ type: ACTION_TYPE.CLEAR_USERS });
	dispatch({ type: ACTION_TYPE.CLEAR_CART });
	navigate('/');
};
