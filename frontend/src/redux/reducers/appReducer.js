import { ACTION_TYPE } from '../actions';

const initialAppState = {
	categoryId: null,
	sortOrder: 1,
	drawerIsOpen: false,
	lastPage: 1,
	scroller: false,
};

export const appReducer = (state = initialAppState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_CATEGORY_ID:
			return {
				...state,
				categoryId: payload,
			};
		case ACTION_TYPE.SET_DRAWER_VISIBILITY:
			return {
				...state,
				drawerIsOpen: payload,
			};
		case ACTION_TYPE.SET_LAST_PAGE:
			return {
				...state,
				lastPage: payload,
			};
		case ACTION_TYPE.SET_SORT_ORDER: {
			return {
				...state,
				sortOrder: payload,
			};
		}
		case ACTION_TYPE.SET_SCROLLER:
			return {
				...state,
				scroller: payload,
			};
		default:
			return state;
	}
};
