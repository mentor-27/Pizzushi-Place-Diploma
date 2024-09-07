import { axiosInstance } from './instance';

export const get = async () => {
	try {
		const resp = (await axiosInstance.get('/cart'))?.data;
		if (resp?.error) {
			throw new Error(resp.error);
		}
		return resp.data;
	} catch (e) {
		console.log(e);
	}
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

export const checkout = async data => {
	return (await axiosInstance.post(`/cart/checkout`, data)).data;
};
