import { ROLES_AUTH_NUMBERS } from '../../consts';
import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialUsersState = {
	roles:
		(JSON.parse(localStorage.getItem('isAuth')) && (await Api.users.getRoles())) || [],
	users:
		(ROLES_AUTH_NUMBERS.includes(JSON.parse(localStorage.getItem('roleId'))) &&
			(await Api.users.getUsers())) ||
		[],
};

export const usersReducer = (state = initialUsersState, action) => {
	const { type, payload } = action;
	console.log(state);
	switch (type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				users: payload,
			};
		case ACTION_TYPE.CLEAR_USERS:
			return {
				roles: [],
				users: [],
			};
		default:
			return state;
	}
};
