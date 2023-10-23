import { Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';

function Footer() {
	return (
		<Link to="https://localhost:44421/login">
			<Flex height="80px" width="100vw" alignItems="center" justifyContent="center" gap="10px">
				<ArrowBackIcon size="1.5rem" color="white" spacing="1rem" />
				<Text color="white">Go to FlowDG</Text>
			</Flex>
		</Link>
	);
}

export default Footer;
