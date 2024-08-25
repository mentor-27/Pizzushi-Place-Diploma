import { ACTION_TYPE } from './actionTypes';

export const setSortOrder = sortOrder => ({
	type: ACTION_TYPE.SET_SORT_ORDER,
	payload: sortOrder,
});
