import { ACTION_TYPE } from './actionTypes';

export const setCategoryId = categoryId => ({
	type: ACTION_TYPE.SET_CATEGORY_ID,
	payload: categoryId,
});
