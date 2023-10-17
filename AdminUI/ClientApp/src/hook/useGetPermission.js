export const useGetPermission = (screenPermission, resourceName) => {
	const userPermission_JSON = localStorage.getItem('userPermission');
	const userPermission = JSON.parse(userPermission_JSON);

	const userPermissionOnThisScreen = userPermission.filter((item) => item.resource === resourceName);

	const result = {};
	userPermissionOnThisScreen.forEach((x) => {
		result[x.permission] = x.permission && screenPermission[x.permission] ? true : false;
	});

	result.role = userPermission ? userPermission[0].role : 'employee';
	return result;
};
