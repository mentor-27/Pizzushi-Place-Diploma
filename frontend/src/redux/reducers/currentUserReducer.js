import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions';

const initialCurrentUserState = {
	id: null,
	login: null,
	email: null,
	name: null,
	surname: null,
	phone: null,
	accessToken: localStorage.getItem('accessToken') || null,
	roleId: null,
	...(localStorage.getItem('accessToken') && (await Api.users.getMe())),
};

export const currentUserReducer = (state = initialCurrentUserState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_USER:
			return payload;
		case ACTION_TYPE.CLEAR_USER:
			return {
				id: null,
				login: null,
				email: null,
				name: null,
				surname: null,
				phone: null,
				accessToken: null,
				roleId: null,
			};
		default:
			return state;
	}
};
