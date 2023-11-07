import { useQuery } from 'react-query';
import { pagingInstance } from '../../helper/constants/PagingInstance';
import axiosBase, { baseURL } from './common/AxiosInstance';

const endPoint = baseURL + '/accounts';

const getListAccount = async ({ paging = pagingInstance }) => {
	try {
		const response = await axiosBase.post(`${endPoint}`, paging);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getAccountDetail = async (id) => {
	const response = await axiosBase.get(`${endPoint}/detail/${id}`);
	return response.data;
};

const createAccount = async (accountDetail) => {
	const response = await axiosBase.post(`${endPoint}/create`, accountDetail);
	return response.data;
};

const saveAccount = async ({ id, accountDetail }) => {
	const response = await axiosBase.post(`${endPoint}/update/${id}`, accountDetail);
	return response.data;
};

const deleteAccount = async (id) => {
	const response = await axiosBase.delete(`${endPoint}/delete/${id}`);
	return response.data;
};

const useGetListAccount = () => {
	return useQuery('', getListAccount, {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

const useGetAccountDetail = (id) => {
	return useQuery(['detail', id], getAccountDetail(id), {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

export const accountService = {
	getAccountDetail,
	getListAccount,
	useGetAccountDetail,
	useGetListAccount,
	createAccount,
	saveAccount,
	deleteAccount
};
