import { useQuery } from 'react-query';
import { pagingInstance } from '../../helper/constants/PagingInstance';
import axiosBase, { baseURL } from './common/AxiosInstance';

const endPoint = baseURL + '/trunks';

const getListTrunk = async ({ paging = pagingInstance }) => {
	try {
		const response = await axiosBase.post(`${endPoint}`, paging);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getTrunkDetail = async (id) => {
	const response = await axiosBase.get(`${endPoint}/detail/${id}`);
	return response.data;
};

const createTrunk = async (trunkDetail) => {
	const response = await axiosBase.post(`${endPoint}/create`, trunkDetail);
	return response.data;
};

const saveTrunk = async ({ id, trunkDetail }) => {
	const response = await axiosBase.post(`${endPoint}/update/${id}`, trunkDetail);
	return response.data;
};

const deleteTrunk = async (id) => {
	const response = await axiosBase.delete(`${endPoint}/delete/${id}`);
	return response.data;
};

const useGetListTrunk = () => {
	return useQuery('', getListTrunk, {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

const useGetTrunkDetail = (id) => {
	return useQuery(['detail', id], getTrunkDetail(id), {
		refetchOnWindowFocus: false,
		retry: 3
	});
};

export const trunkService = {
	getTrunkDetail,
	getListTrunk,
	useGetTrunkDetail,
	useGetListTrunk,
	createTrunk,
	saveTrunk,
	deleteTrunk
};
