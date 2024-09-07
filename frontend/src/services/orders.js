import { axiosInstance } from './instance';

export const get = async () => {
	try {
		const resp = (await axiosInstance.get('/orders')).data;
		if (resp.error) {
			throw new Error(resp.error);
		}
		return resp;
	} catch (e) {
		console.log(e);
	}
};

export const remove = async id => {
	try {
		return (await axiosInstance.delete(`/orders/${id}`)).data;
	} catch (e) {
		console.log(e);
	}
};
