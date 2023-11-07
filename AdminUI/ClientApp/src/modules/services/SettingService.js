import axiosBase, { baseURL } from './common/AxiosInstance';

const endPoint = baseURL + '/setting';

const saveAsteriskSettings = async ({ data }) => {
	const { isLocal, serverIp, sshPort, serverPort, serverUsername, serverPassword } = data;
	try {
		const response = await axiosBase.post(`${endPoint}/saveAsteriskSettings`, {
			isLocal: isLocal,
			serverIp: serverIp,
			sshPort: sshPort,
			serverPort: serverPort,
			serverUsername: serverUsername,
			serverPassword: serverPassword
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const saveAsteriskService = async ({ googleKey }) => {
	try {
		const response = await axiosBase.post(`${endPoint}/saveAsteriskService`, {
			googleKey: googleKey
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const getAsteriskSettings = async () => {
    try {
        const response = await axiosBase.get(`${endPoint}/getAsteriskSettings`);
		return response.data;
    } catch (error) {
		console.log(error);
	}
};

const getAsteriskService = async () => {
    try {
        const response = await axiosBase.get(`${endPoint}/getAsteriskService`);
		return response.data;
    } catch (error) {
		console.log(error);
	}
};

const getAsteriskStatus = async () => {
    try {
        const response = await axiosBase.get(`${endPoint}/getAsteriskStatus`);
		return response.data;
    } catch (error) {
		console.log(error);
	}
};

export const settingService = {
	saveAsteriskSettings,
	saveAsteriskService,
    getAsteriskSettings,
    getAsteriskService,
    getAsteriskStatus
};
