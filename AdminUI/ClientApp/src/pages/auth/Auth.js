import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Footer from '../../common/features/auth/Footer';
import Header from '../../common/features/auth/Header';
import background from '../../assets/bg.png';

function Auth() {
	return (
		<Box backgroundImage={background}>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
}

export default Auth;
