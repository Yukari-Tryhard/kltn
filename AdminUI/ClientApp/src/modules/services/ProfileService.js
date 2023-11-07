import { useQuery } from 'react-query';
import axiosBase, { baseURL } from './common/AxiosInstance';

const endPoint = baseURL + '/profile';

export const useGetProfileDetail = (id) => {
	return useQuery(['detail', id], () => getProfileDetail(id), {
		refetchOnWindowFocus: false,
		retry: 1
	});
};

const getProfileDetail = async (id) => {
	try {
		const response = await axiosBase.get(`${endPoint}/detail/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const saveProfileDetail = async ({ id, profileDetail }) => {
	try {
		const response = await axiosBase.post(`${endPoint}/update/${id}`, profileDetail);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const uploadProfileImages = async (uploadImages) => {
	try {
		const headers = {
			'Content-Type': 'multipart/form-data'
		};
		const response = await axiosBase.post(`${endPoint}/uploadImages`, uploadImages, {
			headers
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const validateFirstTimeLogin = async () => {
	try {
		const response = await axiosBase.get(`${endPoint}/validateFirstTimeLogin`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const profileService = {
	getProfileDetail,
	saveProfileDetail,
	uploadProfileImages,
	validateFirstTimeLogin
};
