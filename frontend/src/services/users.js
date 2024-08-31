import { axiosInstance } from './instance';

export const getMe = async () => {
	return (await axiosInstance.get('/users/me')).data.data;
};

export const getRoles = async () => {
	return (await axiosInstance.get('/users/roles')).data;
};

export const getUsers = async () => {
	return (await axiosInstance.get('/users')).data;
};

export const deleteUser = async id => {
	return (await axiosInstance.delete(`/users/${id}`)).data;
};
