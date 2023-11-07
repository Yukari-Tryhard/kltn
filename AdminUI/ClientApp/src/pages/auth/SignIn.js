// Core
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

// Network core
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import * as Yup from 'yup';

// Decoration
import { Box, Flex, Center, Text, Heading, Stack, Button, useToast } from '@chakra-ui/react';
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AuthTextField from '../../common/components/field/AuthTextField';

// Service
import { authService } from '../../modules/services/AuthService';
import { profileService } from '../../modules/services/ProfileService';

function SignIn() {
	const navigate = useNavigate();
	const toast = useToast();
	const queryClient = useQueryClient();
	const cookies = new Cookies();

	const useLoginMutation = useMutation(authService.login, {
		onSuccess: async (data) => {
			// Set cookies
			const { refresh, access } = data;
			const decoded = jwtDecode(refresh);
			cookies.set('jwt_authentication', refresh, {
				expires: new Date(decoded.exp * 1000)
			});
			localStorage.setItem('accessToken', JSON.stringify(access));
			const decodeData = jwtDecode(access);
			queryClient.setQueryData(['userDecodeData'], decodeData);

			// Check first time login
			const isFirstTimeLogin = await profileService.validateFirstTimeLogin();
			if (isFirstTimeLogin && isFirstTimeLogin.result) {
				navigate('/first-time-login');
				localStorage.setItem('isFirstTimeLogin', true);
			} else {
				navigate('app/dashboard');
				localStorage.setItem('isFirstTimeLogin', false);
			}

			// Show toast
			toast({
				title: 'Sign In Successfully',
				position: 'bottom-right',
				status: 'success',
				isClosable: true,
				duration: 5000
			});
		},
		onError: (error) => {
			console.log(error);
			toast({
				title: error.response.data.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});

	const initialValues = { email: '', password: '' };
	const validationSchema = Yup.object().shape({
		password: Yup.string().required('Password is required').min(6, 'Password is too short'),
		email: Yup.string().email('Invalid Email').required('Email is required')
	});
	useEffect(() => {
		toast.closeAll();
	}, [toast]);

	return (
		<Center minHeight="calc(100vh - 160px)" width="100vw">
			<Box paddingX="5" paddingY="8" bgColor="white" shadow="2xl" rounded="xl">
				<Stack spacing="5">
					<Flex gap="2" flexDirection="column" alignItems="center">
						<Heading fontSize="xl">Sign in to your Account</Heading>
						<Text>Welcome back!</Text>
					</Flex>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, actions) => {
							useLoginMutation.mutate({
								email: values.email,
								password: values.password
							});
							actions.resetForm();
						}}
					>
						{(formik) => (
							<Stack spacing="5" as="form" onSubmit={formik.handleSubmit}>
								<AuthTextField label="Email" name="email" placeholder="Email" leftIcon={<AtSignIcon />} />
								<AuthTextField label="Password" name="password" placeholder="********" type="password" leftIcon={<LockIcon />} rightIcon={<ViewIcon />} hideIcon={<ViewOffIcon />} />
								<Button
									type="submit"
									bgColor="#1C6758"
									color="whitesmoke"
									isLoading={useLoginMutation.isLoading}
									_hover={{
										color: 'black',
										background: 'whitesmoke',
										border: '1px solid black'
									}}
								>
									Sign In
								</Button>
							</Stack>
						)}
					</Formik>
					<Flex justifyContent="center" gap="1">
						<Text>Don't have an account? </Text>
						<Link to="/sign-up">
							<span style={{ fontWeight: 'bold' }}>Sign up</span>
						</Link>
					</Flex>
				</Stack>
			</Box>
		</Center>
	);
}

export default SignIn;
