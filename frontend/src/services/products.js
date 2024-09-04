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
		return resp.data;
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

// export const getById = async id => {
// 	return (await axiosInstance.get(`/products/${id}`)).data;
// };
