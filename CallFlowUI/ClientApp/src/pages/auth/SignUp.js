import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Box, Flex, Center, Text, Heading, Stack, Button, useToast } from '@chakra-ui/react';
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon, StarIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';

import AuthTextField from '../../common/components/field/AuthTextField';

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	// const useRegisterMutation = useMutation(authService.register, {
	// 	onSuccess: (data) => {
	// 		toast({
	// 			title: 'Sign Up Successfully',
	// 			position: 'bottom-right',
	// 			status: 'success',
	// 			isClosable: true,
	// 			duration: 5000
	// 		});
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 		toast({
	// 			title: error.response.data.message,
	// 			position: 'bottom-right',
	// 			status: 'error',
	// 			isClosable: true,
	// 			duration: 5000
	// 		});
	// 	}
	// });

	return (
		<Center minHeight="calc(100vh - 160px)" width="100vw">
			<Box paddingX="5" paddingY="8" bgColor="whitesmoke" rounded="xl">
				<Stack spacing="5">
					<Flex gap="2" flexDirection="column" alignItems="center">
						<Heading fontSize="xl">Create your account</Heading>
						<Text>Hey, Enter your details to get sign up</Text>
					</Flex>
					<Formik
						initialValues={{
							userName: '',
							email: '',
							password: '',
							confirmPassword: ''
						}}
						validationSchema={Yup.object({
							userName: Yup.string().min(3, 'Please enter a valid username').required('User Name required'),
							email: Yup.string().email('Invalid Email').required('Email required'),
							password: Yup.string().required('Password required').min(6, 'Password is too short'),
							confirmPassword: Yup.string()
								.oneOf([Yup.ref('password'), null], 'Passwords must match')
								.required('Confirm password is required')
						})}
						onSubmit={(values, actions) => {
							alert(JSON.stringify(values, null, 2));
							const newCredential = {
								username: values.userName,
								email: values.email,
								password: values.password
							};
							//useRegisterMutation.mutate(newCredential);
							actions.resetForm();
						}}
					>
						{(formik) => (
							<Stack spacing="5" as="form" onSubmit={formik.handleSubmit}>
								<AuthTextField label="User Name" name="userName" placeholder="duy678" leftIcon={<StarIcon />} />
								<AuthTextField label="Email" name="email" placeholder="abc@gmail.com" leftIcon={<AtSignIcon />} />
								<AuthTextField label="Password" name="password" placeholder="********" type="password" leftIcon={<LockIcon />} rightIcon={<ViewIcon />} hideIcon={<ViewOffIcon />} />
								<AuthTextField label="Confirm password" name="confirmPassword" placeholder="********" type="password" leftIcon={<LockIcon />} rightIcon={<ViewIcon />} hideIcon={<ViewOffIcon />} />
								<Button
									type="submit"
									bgColor="#1C6758"
									color="whitesmoke"
									//isLoading={useRegisterMutation.isLoading}
									_hover={{
										color: 'black',
										background: 'whitesmoke',
										border: '1px solid black'
									}}
								>
									{' '}
									Sign up
								</Button>
							</Stack>
						)}
					</Formik>
					<Flex justifyContent="center" gap="1">
						<Text>You have register already? </Text>
						<Link to="/sign-in">
							<span style={{ fontWeight: 'bold' }}>Sign in Now</span>
						</Link>
					</Flex>
				</Stack>
			</Box>
		</Center>
	);
};

export default SignUp;
