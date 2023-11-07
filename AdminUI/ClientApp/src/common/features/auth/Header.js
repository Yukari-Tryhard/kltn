import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/react';

import LogoWhite from '../../../assets/logos/Logo-white.png';

function Header() {
	const location = useLocation();

	return (
		<Flex height="80px" width="100vw" alignItems="center" justifyContent="center">
			{location.pathname === '/sign-in' ? <Image className="flex w-[30rem] h-[35rem] pt-20" src={LogoWhite} /> : null}
		</Flex>
	);
}

export default Header;
