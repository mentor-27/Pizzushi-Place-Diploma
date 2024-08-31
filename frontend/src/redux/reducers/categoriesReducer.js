import { Api } from '../../services/apiClient';
import { ACTION_TYPE } from '../actions/actionTypes';

const initialCategoriesState = {
	categories: (await Api.categories.get()) || [],
	loading: false,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				categories: payload,
				loading: false,
			};
		case ACTION_TYPE.SET_CATEGORIES_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return state;
	}
};
