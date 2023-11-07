import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

import { Helper } from '../../../helper/Helper';
import { globalNavigate } from '../../../common/components/GlobalHistory';
import { AXIOS_HELPER } from '../../../helper/constants/GlobalConstantUtil';

export const baseURL = process.env.BACKEND_URL;

const cookies = new Cookies();
export const { JWT_AUTHENTICATION, ACCESS_TOKEN, BEARER, SIGN_IN } = AXIOS_HELPER;

function handleAuthError() {
	cookies.remove(JWT_AUTHENTICATION);
	localStorage.removeItem(ACCESS_TOKEN);
	globalNavigate(SIGN_IN);
}

const axiosBase = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || baseURL,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosBase.interceptors.request.use((config) => {
	const accessTokenJSON = localStorage.getItem(ACCESS_TOKEN);
	const accessToken = JSON.parse(accessTokenJSON);
	const refreshToken = cookies.get(JWT_AUTHENTICATION);

	if (accessToken && !Helper.isTokenExpired(accessToken)) {
		config.headers.Authorization = `${BEARER} ${accessToken}`;
	} else if (!refreshToken && accessToken != null) {
		handleAuthError();
	}
	return config;
});

axiosBase.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = cookies.get(JWT_AUTHENTICATION);
			if (refreshToken && !Helper.isTokenExpired(refreshToken)) {
				try {
					const { data } = await axios.post('auth/refreshToken', undefined, {
						'Content-Type': 'application/json',
						Authorization: `${BEARER} ${refreshToken}`
					});
					const { refresh, access } = data;
					if (refresh && access) {
						const decoded = jwtDecode(refresh);
						localStorage.setItem(ACCESS_TOKEN, JSON.stringify(access));
						cookies.set(JWT_AUTHENTICATION, refresh, { expires: new Date(decoded.exp * 1000) });
						return axiosBase(originalRequest);
					} else {
						handleAuthError();
					}
				} catch (err) {
					console.error(err);
					handleAuthError();
				}
			} else {
				handleAuthError();
			}
		}
		return Promise.reject(error);
	}
);

export default axiosBase;
