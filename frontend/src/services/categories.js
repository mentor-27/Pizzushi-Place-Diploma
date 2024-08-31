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
