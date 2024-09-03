import { ROLES_AUTH_NUMBERS } from '../../consts';
import { ACTION_TYPE } from '../actions';
import { Api } from '../../services/apiClient';

const initialUsersState = {
	roles:
		(JSON.parse(localStorage.getItem('isAuth')) && (await Api.users.getRoles())) || [],
	users:
		(ROLES_AUTH_NUMBERS.includes(JSON.parse(localStorage.getItem('roleId'))) &&
			(await Api.users.getUsers())) ||
		[],
	loading: false,
};

export const usersReducer = (state = initialUsersState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				users: payload,
				loading: false,
			};
		case ACTION_TYPE.SET_USERS_LOADING:
			return {
				...state,
				loading: payload,
			};
		case ACTION_TYPE.EDIT_USER: {
			const idx = state.users.findIndex(user => user.id === payload.id);
			return { ...state, users: state.users.with(idx, payload), loading: false };
		}
		case ACTION_TYPE.SET_ROLES:
			return {
				...state,
				roles: payload,
				loading: false,
			};
		case ACTION_TYPE.CLEAR_USERS:
			return {
				roles: [],
				users: [],
				loading: false,
			};
		default:
			return state;
	}
};
