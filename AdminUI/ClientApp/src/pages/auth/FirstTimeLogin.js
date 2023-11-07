// Core
import React from 'react';
import { Text, Stack, Center, VStack, Image, Button, Heading, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Highlight } from '@chakra-ui/react';

// Assets
import firstTimeLogin from '../../assets/images/firstTimeLogin.jpg';
import background from '../../assets/images/bg.png';

// Components
import ProfileSettings from '../../pages/home/ProfileSettings';

function FirstTimeLogin() {
	const { isOpen, onOpen, onClose } = useDisclosure();

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

			<Modal size="6xl" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="#ffffffb5">
					<ModalHeader>
						<Highlight query="First Time Update Profile Information" styles={{ px: '2', py: '1', rounded: 'md', bg: 'green.100' }}>
							First Time Update Profile Information
						</Highlight>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ProfileSettings />
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	);
}

export default FirstTimeLogin;
