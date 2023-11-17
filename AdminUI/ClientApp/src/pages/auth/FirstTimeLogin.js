// Core
import React from 'react';
import { Text, Stack, Center, VStack, Image, Button, Heading, Flex, Box, Modal, ModalOverlay, useBreakpointValue, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Highlight, HStack } from '@chakra-ui/react';

// Assets
import firstTimeLogin from '../../assets/images/firstTimeLogin.jpg';
import background from '../../assets/images/bg.png';

// Components
import ProfileSettings from '../../common/features/settings/ProfileSettings';

function FirstTimeLogin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = React.useState('inside');

	const btnRef = React.useRef(null);
	const boxWidth = useBreakpointValue({ base: '100%', md: '75%', lg: '50%' });
	const boxHeight = useBreakpointValue({ base: '100%', md: '75%', lg: '50%' });

	return (
		<>
			<Stack h="100vh" backgroundImage={background}>
				<Center m="auto" p={5} rounded="md" bg="white" shadow="2xl">
					<VStack spacing="15px">
						<Flex w="100%" gap="10px">
							<Box w="10px" bg="green.700" borderRadius="5px"></Box>
							<Heading fontSize="1.5rem">First Time Login</Heading>
						</Flex>
						<Box>
							<Image src={firstTimeLogin} height="350px" />
						</Box>
						<Box textAlign="center">
							<Text fontSize="2xl" fontWeight="bold">
								Welcome to the system!{' '}
							</Text>
							<Text fontSize="xl">Please take a moment to fill out your profile information.</Text>
						</Box>
						<Button colorScheme="green" onClick={onOpen}>
							Click here
						</Button>
					</VStack>
				</Center>
			</Stack>

			<Modal size="6xl" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} scrollBehavior={scrollBehavior} bg="#ffffffb5" isCentered={true}>
				<ModalOverlay />

				<ModalContent minWidth="fit-content" height="fit-content">
					<ModalHeader>
						<HStack display="flex" width="100%" gap="15px">
							<Flex gap={3}>
								<Box w="10px" bg="green.700" borderRadius="5px" />
								First Time Update Profile Information
							</Flex>
						</HStack>
					</ModalHeader>

					<ModalCloseButton />

					<ModalBody w="100%" h="100%">
						<Box>
							<ProfileSettings />
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default FirstTimeLogin;
