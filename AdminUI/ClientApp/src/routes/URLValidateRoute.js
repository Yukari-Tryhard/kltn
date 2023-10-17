import React from 'react';
import { Outlet } from 'react-router-dom';
import { urlService } from '../services/url/url';
import NotFound from '../pages/error/NotFound';

export default function URLValidationRoute() {
	const url = window.location.href;
	const dataQuery = { url };
	const { data: urlValidateData, isFetching: urlValidateIsFetching } = urlService.useValidateURL(dataQuery);

	if (urlValidateIsFetching) {
		return null;
	}

	if (urlValidateData.result === false) {
		return <NotFound />;
	}

	return <Outlet />;
}
