import { axiosInstance } from './instance';

export const get = async () => {
	try {
		const resp = (await axiosInstance.get('/categories')).data;
		if (resp.error) {
			throw new Error(resp.error);
		}
		return resp.data;
	} catch (e) {
		console.log(e);
	}
};

export const editCategory = async (id, data) => {
	return (await axiosInstance.patch(`/categories/${id}`, data)).data;
};

export const addCategory = async data => {
	return (await axiosInstance.post('/categories', data)).data;
};

export const deleteCategory = async id => {
	return (await axiosInstance.delete(`/categories/${id}`)).data;
};
