import { ACTION_TYPE } from './actionTypes';

export const toggleDrawer = value => ({
	type: ACTION_TYPE.SET_DRAWER_VISIBILITY,
	payload: value,
});
