import { axiosInstance } from './instance';
import toast from 'react-hot-toast';

export const login = async data => {
	try {
		return (await axiosInstance.post('/login', data))?.data;
	} catch (e) {
		toast.error(`Что-то пошло не так: ${e}`);
	}
};

export const register = async data => {
	try {
		return (await axiosInstance.post('/register', data))?.data;
	} catch (e) {
		toast.error(`Что-то пошло не так: ${e}`);
	}
};

export const logout = async () => {
	try {
		return (await axiosInstance.post('/logout'))?.data;
	} catch (e) {
		toast.error(`Что-то пошло не так: ${e}`);
	}
};
