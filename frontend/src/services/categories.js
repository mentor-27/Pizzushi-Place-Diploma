import { axiosInstance } from './instance';

export const get = async () => {
	return (await axiosInstance.get('/categories')).data;
};
