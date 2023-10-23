import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import { CallFlowUserClient } from '../../api/web-api-client.ts';
import { BACKEND_URL } from '../../env';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Flex, Center, Text, Heading, Stack, Button, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon, StarIcon } from '@chakra-ui/icons';
import AuthTextField from '../../common/components/field/AuthTextField';
import { FaGithub } from 'react-icons/fa';

const CLIENT_ID = '3221d71db78c4584a0fd';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const notify = () => toast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert("Passwords don't match");
            return;
        }
        console.log('Email:', email, 'Password:', password);
        // Add your logic here to handle email and password sign up
    };

    const handleGithubSignUp = () => {
        // Add your logic here to handle GitHub sign in
        window.location.assign('https://github.com/login/oauth/authorize?scope=repo&client_id=' + CLIENT_ID);
    };

    const handleSignUp = async () => {
        // const userClient = new CallFlowUserClient(BACKEND_URL);
        // const reps = await userClient.registerNewUser({email, userName, password, retypedPassword:retypePassword});
        // if (reps.status === 200) {
        //   toast.success("Signup Successfully");
        //   navigate("/signin")
        // } else {
        //   // Display "Create Failed" toast
        //   toast.error("Signup failed");
        // }
    };

    return (
        <section className="h-screen">
            <Center minHeight="calc(100vh - 160px)" width="100vw" bgColor="gray.200">
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
                                        bgColor="blue.600"
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
                                    <Center h="50px" color="dark:text-neutral-20">
                                        Or
                                    </Center>
                                    <Button
                                        type="submit"
                                        bgColor="black"
                                        leftIcon={<FaGithub />}
                                        color="whitesmoke"
                                        //isLoading={useRegisterMutation.isLoading}
                                        _hover={{
                                            color: 'black',
                                            background: 'whitesmoke',
                                            border: '1px solid black'
                                        }}
                                    >
                                        {' '}
                                        Continue with Github
                                    </Button>
                                </Stack>
                            )}
                        </Formik>
                        <Flex justifyContent="center" gap="1">
                            <Text>You have register already? </Text>
                            <Link to="auth/login">
                                <span style={{ fontWeight: 'bold' }}>Sign in Now</span>
                            </Link>
                        </Flex>
                    </Stack>
                </Box>
            </Center>
        </section>
    );
};

export default SignUp;
