import { ROLES_AUTH_NUMBERS } from '../consts';
import { axiosInstance } from './instance';

export const getMe = async () => {
	try {
		const resp = (await axiosInstance.get('/users/me')).data?.data;
		if (ROLES_AUTH_NUMBERS.includes(resp?.roleId)) {
			return { ...resp, isAuth: true };
		} else {
			return { ...resp, isAuth: false };
		}
	} catch (e) {
		console.log(e);
	}
};

export const getRoles = async () => {
	try {
		return (await axiosInstance.get('/users/roles')).data?.data;
	} catch (e) {
		console.log(e);
	}
};

export const getUsers = async () => {
	try {
		return (await axiosInstance.get('/users')).data.data;
	} catch (e) {
		console.log(e);
	}
};

export const edit = async (id, data) => {
	try {
		return (await axiosInstance.put(`/users/${id}`, data)).data;
	} catch (e) {
		console.log(e);
	}
};

export const remove = async id => {
	try {
		return (await axiosInstance.delete(`/users/${id}`)).data;
	} catch (e) {
		console.log(e);
	}
};
