import { axiosInstance } from './instance';

// export const search = async query => {
// 	return (
// 		await axiosInstance.get('/products/search', {
// 			params: { query },
// 		})
// 	).data;
// };

export const get = async () => {
	try {
		const resp = (await axiosInstance.get('/products')).data;
		if (resp.error) {
			throw new Error(resp.error);
		}
		return resp;
	} catch (e) {
		console.log(e);
	}
};

export const getPaginated = async (sortBy, sortOrder) => {
	return (
		await axiosInstance.get('/products', {
			params: { sortBy, sortOrder },
		})
	).data;
};

export const edit = async (id, data) => {
	return (await axiosInstance.patch(`/products/${id}`, data)).data;
};

export const add = async data => {
	return (await axiosInstance.post('/products', data)).data;
};

export const remove = async id => {
	return (await axiosInstance.delete(`/products/${id}`)).data;
};

// export const getById = async id => {
// 	return (await axiosInstance.get(`/products/${id}`)).data;
// };
