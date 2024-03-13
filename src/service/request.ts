import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';

import { BASE_API } from './api/index';
import { getTokenFromLocalStorage } from './localStorage';

const axiosInstance = axios.create({
	baseURL: BASE_API,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use((config) => {
	const tokenAuth = getTokenFromLocalStorage();
	if (tokenAuth) {
		config.headers.Authorization = `Token ${tokenAuth}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
