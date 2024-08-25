import { axiosInstance } from './instance';

export const search = async query => {
	return (
		await axiosInstance.get('/products/search', {
			params: { query },
		})
	).data;
};

export const get = async () => {
	return (await axiosInstance.get('/products')).data;
};

export const getPaginated = async (page, limit, categoryId, sortBy, sortOrder) => {
	return (
		await axiosInstance.get('/products', {
			params: { page, limit, categoryId, sortBy, sortOrder },
		})
	).data;
};

export const getById = async id => {
	return (await axiosInstance.get(`/products/${id}`)).data;
};
