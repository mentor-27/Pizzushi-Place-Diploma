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
		case ACTION_TYPE.EDIT_CATEGORY: {
			const idx = state.categories.findIndex(category => category.id === payload.id);
			return {
				...state,
				categories: state.categories.with(idx, payload),
				loading: false,
			};
		}
		case ACTION_TYPE.ADD_CATEGORY:
			return {
				...state,
				categories: [...state.categories, payload],
				loading: false,
			};
		case ACTION_TYPE.DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(({ id }) => id !== payload),
				loading: false,
			};
		default:
			return state;
	}
};
