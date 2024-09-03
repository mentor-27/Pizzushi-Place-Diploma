import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '../consts';

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
	return config;
});

axiosInstance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error.config._retry) {
			originalRequest._retry = true;
			try {
				const { data } = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
				localStorage.setItem('accessToken', data.data.accessToken);
				return axiosInstance.request(originalRequest);
			} catch (e) {
				console.log('Unauthorized');
			}
		}
		toast.error(error.response.data.error);
	},
);
