import { axiosInstance } from './instance';

export const getMe = async () => {
	return (await axiosInstance.get('/users/me')).data?.data;
};

export const getRoles = async () => {
	return (await axiosInstance.get('/users/roles')).data?.data;
};

export const getUsers = async () => {
	return (await axiosInstance.get('/users')).data.data;
};

export const edit = async (id, data) => {
	return (await axiosInstance.put(`/users/${id}`, data)).data;
};

export const remove = async id => {
	return (await axiosInstance.delete(`/users/${id}`)).data;
};
