import { ACTION_TYPE } from '../actions';

const initialUsersState = {
	users: [],
};

export const usersReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};
