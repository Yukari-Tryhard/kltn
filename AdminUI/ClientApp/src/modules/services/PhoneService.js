import { useQuery } from 'react-query';
import { pagingInstance } from '../../helper/constants/PagingInstance';
import axiosBase, { baseURL } from './common/AxiosInstance';

const endPoint = baseURL + '/phones';

const getListPhone = async ({ paging = pagingInstance }) => {
	try {
		const response = await axiosBase.post(`${endPoint}`, paging);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getPhoneDetail = async (id) => {
	const response = await axiosBase.get(`${endPoint}/detail/${id}`);
	return response.data;
};

const createPhone = async (phoneDetail) => {
	const response = await axiosBase.post(`${endPoint}/create`, phoneDetail);
	return response.data;
};

const savePhone = async ({ id, phoneDetail }) => {
	const response = await axiosBase.post(`${endPoint}/update/${id}`, phoneDetail);
	return response.data;
};

const deletePhone = async (id) => {
	const response = await axiosBase.delete(`${endPoint}/delete/${id}`);
	return response.data;
};

const useGetListPhone = () => {
	return useQuery('', getListPhone, {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

const useGetPhoneDetail = (id) => {
	return useQuery(['detail', id], getPhoneDetail(id), {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

export const phoneService = {
	getPhoneDetail,
	getListPhone,
	useGetPhoneDetail,
	useGetListPhone,
	createPhone,
	savePhone,
	deletePhone
};
