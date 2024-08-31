import { axiosInstance } from './instance';

export const login = async data => {
	return (await axiosInstance.post('/login', data)).data;
};

export const register = async data => {
	return (await axiosInstance.post('/register', data)).data;
};

export const logout = async () => {
	return (await axiosInstance.post('/logout')).data;
};
