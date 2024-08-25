import { Api } from '../../services/apiClient';
import { setCategoryId } from '../actions';
import { ACTION_TYPE } from './actionTypes';

export const setCategoriesAsync = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING, payload: true });
	const { data } = await Api.categories.get();
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES, payload: data });
	dispatch(setCategoryId(data[0].id));
};
