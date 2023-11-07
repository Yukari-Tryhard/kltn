import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

function ErrorRoute() {
	return (
		<Box className="bg-base-200">
			<Flex height="75px" />
			<Outlet />
			<Flex height="75px" />
		</Box>
	);
}

export default ErrorRoute;
