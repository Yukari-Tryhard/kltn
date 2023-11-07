import React from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Heading, Stack } from '@chakra-ui/react';

import { setPageTitle } from '../../modules/store/common/HeaderSlice';
import '../../styles/NotFound.css';

function NotFound() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: '' }));
	}, [dispatch]);

	const navigate = useNavigate();

	return (
		<div className="hero h-3/4 bg-base-200">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<Center fontFamily="Arvo">
						<Stack>
							<Flex flexDirection="column" align="center" justifyItems="center">
								<Flex gap="20px" alignItems="center" flexDirection="column">
									<Heading fontSize="70px">404</Heading>

									<Box backgroundRepeat="no-repeat" className="four_zero_four_bg"></Box>

									<Heading className="h3 ">Oops, this page couldn’t be found</Heading>

									<Button onClick={() => navigate(-1)} textDecoration="none" colorScheme="green">
										Go back
									</Button>
								</Flex>
							</Flex>
						</Stack>
					</Center>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
