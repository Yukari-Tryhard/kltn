import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import axiosBase, { baseURL, JWT_AUTHENTICATION, ACCESS_TOKEN, SIGN_IN } from './common/AxiosInstance';
import { globalNavigate } from '../../common/components/GlobalHistory';

const endPoint = baseURL + '/auth';
const cookies = new Cookies();

const login = async ({ email, password }) => {
	try {
		const response = await axiosBase.post(`${endPoint}/login`, { email, password });
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

const register = async ({ username, email, password }) => {
	try {
		const response = await axiosBase.post(`${endPoint}/register`, { username, email, password });
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

const logout = async () => {
	try {
		const response = await axiosBase.delete(`${endPoint}/logout`);
		cookies.remove(JWT_AUTHENTICATION);
		localStorage.removeItem(ACCESS_TOKEN);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

const refreshToken = async ({ refreshToken }) => {
	try {
		const { data } = await axiosBase.post(`${baseURL}/${endPoint}/refreshToken`, undefined, {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${refreshToken}`
		});
		const { refresh, access } = data;
		if (refresh && access) {
			const decoded = jwtDecode(refresh);
			localStorage.setItem(ACCESS_TOKEN, JSON.stringify(access));
			cookies.set(JWT_AUTHENTICATION, refresh, { expires: new Date(decoded.exp * 1000) });
		} else {
			cookies.remove(JWT_AUTHENTICATION);
			localStorage.removeItem(ACCESS_TOKEN);
			globalNavigate(SIGN_IN);
		}
	} catch (error) {
		console.error(error);
	}
};

export const authService = {
	login,
	register,
	logout,
	refreshToken
};
