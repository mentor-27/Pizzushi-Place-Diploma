import { ACTION_TYPE } from './actionTypes';

export const setScroller = payload => ({
	type: ACTION_TYPE.SET_SCROLLER,
	payload,
});
