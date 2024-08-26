import { axiosInstance } from './instance';

export const get = async () => {
	return (await axiosInstance.get('/cart')).data;
};

export const add = async (id, quantity) => {
	return (
		await axiosInstance.post(
			`/cart/${id}`,
			{},
			{
				params: { qty: quantity },
			},
		)
	).data;
};

export const remove = async id => {
	return (await axiosInstance.delete(`/cart/${id}`)).data;
};

export const clear = async () => {
	return (await axiosInstance.delete(`/cart`)).data;
};
