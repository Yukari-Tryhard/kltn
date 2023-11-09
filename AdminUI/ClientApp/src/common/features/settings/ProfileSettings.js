/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useMutation, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Heading, Stack, Text, Button, Spacer, Highlight, useToast, useDisclosure } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { RiFolderUserLine } from 'react-icons/ri';

import LoadingSpinner from '../../components/LoadingSpinner';
import FormTextField from '../../components/field/FormTextField';
import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';
import ImagesUploading from '../../components/ImagesUploading';
import AvatarWithPreview from '../../components/AvatarWithPreview';

import { Helper } from '../../../helper/Helper';

import { profileService, useGetProfileDetail } from '../../../modules/services/ProfileService';

function ProfileSettings() {
	//* #region variables
	const toast = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	let userDecodeData = Helper.getUseDecodeInfo();
	let isFirstTimeLogin = Helper.isFirstTimeLogin();
	const [isAlrUploadImage, setIsAlrUploadImage] = useState(false);
	const [setShowNeedToUploadImageMessage] = useState(false);
	const [images, setImages] = React.useState([]);
	const maxNumber = 1;
	//* #endregion

	//* #region hooks
	const { isOpen: isSaveDetailAlertOpen, onOpen: onSaveDetailAlertOpen, onClose: onSaveDetailAlertClose } = useDisclosure();
	const { data: profileDetailData, isFetching: isFetchingProfileDetail } = useGetProfileDetail(userDecodeData?.id ?? 0);

	const useSaveProfileDetail = useMutation(profileService.saveProfileDetail, {
		onSuccess: (data) => {
			const { message } = data;
			if (message) {
				toast({
					title: message,
					position: 'bottom-right',
					status: 'error',
					isClosable: true,
					duration: 5000
				});
			} else {
				queryClient.invalidateQueries(['profileDetail', userDecodeData.id]);
				if (isFirstTimeLogin) {
					localStorage.setItem('isFirstTimeLogin', false);
					navigate('/training-qr');
				}
				toast({
					title: 'Save Profile Detail Successfully',
					position: 'bottom-right',
					status: 'success',
					isClosable: true,
					duration: 5000
				});
			}
		},
		onError: (error) => {
			toast({
				title: error.response.data.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});

	const useUploadImages = useMutation(profileService.uploadProfileImages, {
		onSuccess: (data) => {
			const { message } = data;
			if (message) {
				toast({
					title: message,
					position: 'bottom-right',
					status: 'error',
					isClosable: true,
					duration: 5000
				});
			} else {
				queryClient.invalidateQueries(['profileDetail', userDecodeData?.id]);
				toast({
					title: 'Save Upload Photos Successfully',
					position: 'bottom-right',
					status: 'success',
					isClosable: true,
					duration: 5000
				});
			}
		},
		onError: (error) => {
			toast({
				title: error.response.data.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});

	useEffect(() => {
		if (profileDetailData?.result?.image) {
			setIsAlrUploadImage(true);
		}
	}, [profileDetailData?.result?.image]);
	//* #endregion

	//* #region functions
	const onChange = (imageList, addUpdateIndex) => {
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};
	const handleSaveUploadImages = (e) => {
		e.preventDefault();
		const formData = new FormData();
		images.map((item) => {
			return formData.append('images', item.file);
		});
		useUploadImages.mutate(formData);
		if (isFirstTimeLogin) {
			setIsAlrUploadImage(true);
			setShowNeedToUploadImageMessage(false);
		}
		setImages([]);
	};
	//* #endregion

	//* #region form
	const initialValues = {
		fullname: profileDetailData?.result?.fullname ?? '',
		email: profileDetailData?.result?.email ?? '',
		gender: profileDetailData?.result?.gender ?? 'male',
		phone: profileDetailData?.result?.phoneNumber ?? '',
		dateOfBirth: profileDetailData?.result?.dateOfBirth ? new Date(profileDetailData?.result?.dateOfBirth).toISOString().substring(0, 10) : '',
		location: {
			country: profileDetailData?.result?.location?.country ?? '',
			state: profileDetailData?.result?.location?.state ?? '',
			city: profileDetailData?.result?.location?.city ?? ''
		},
		address: profileDetailData?.result?.location?.address ?? '',
		department: profileDetailData?.result?.department?.departmentName ?? ''
	};
	const validationSchema = Yup.object().shape(
		isFirstTimeLogin
			? {
					fullname: Yup.string().required('This field is required'),
					phone: Yup.string().required('This field is required'),
					email: Yup.string().email('Invalid email format').required('This field is required'),
					dateOfBirth: Yup.date().max(new Date(), 'Your birth date is invalid').required('This field is required')
			  }
			: {
					fullname: Yup.string().required('This field is required'),
					email: Yup.string().email('Invalid email format').required('This field is required'),
					dateOfBirth: Yup.date().max(new Date(), 'Your birth date is invalid').required('This field is required')
			  }
	);
	//* #endregion

	if (isFetchingProfileDetail) return <LoadingSpinner />;
	else if (!isFirstTimeLogin && !isFetchingProfileDetail) {
		return (
			<Stack spacing={3} className="mt-4 ml-1">
				<Flex
					gap={8}
					flexDirection={{
						base: 'column',
						xl: 'row'
					}}
				>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							onSaveDetailAlertClose();
							const profileDetail = {
								fullname: values?.fullname,
								email: values?.email,
								gender: values?.gender,
								dateOfBirth: values?.dateOfBirth !== '' ? new Date(values?.dateOfBirth).toISOString() : '',
								phoneNumber: values?.phone,
								location: {
									address: values?.address,
									city: values?.location?.city ?? '',
									country: values?.location?.country ?? '',
									state: values?.location?.state ?? ''
								}
							};
							const profileDetailObj = {
								id: userDecodeData?.id,
								profileDetail: profileDetail
							};
							useSaveProfileDetail.mutate(profileDetailObj);
						}}
					>
						{(formik) => (
							<>
								<Stack bgColor="white" flex="1" border="0.5px solid #cfd3df" rounded="lg" as="form" shadow="2xl">
									<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#00AF91" height="65px" borderRadius="10px 10px 0 0">
										<Flex flex="8" alignItems="center" gap="2">
											<Heading fontSize="xl" color="white" overflow="hidden" whiteSpace="nowrap">
												Personal Information
											</Heading>
										</Flex>
										<Spacer />
										<Flex flex="1" pl="5px">
											<Button onClick={formik.isValid ? onSaveDetailAlertOpen : formik.handleSubmit} colorScheme="green">
												Save
											</Button>
										</Flex>
									</Flex>
									<Stack spacing={2} p={4} px={8}>
										<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
											<FormTextField name="fullname" label="Full Name" placeholder="Enter your Full Name" leftIcon={<FaRegUserCircle color="#999" fontSize="1.1rem" />} />
											<FormTextField name="phone" label="Phone number" type="text" placeholder="Enter your number" leftIcon={<AiFillPhone color="#999" fontSize="1.1rem" />} />
										</Flex>
										<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
											<FormTextField name="dateOfBirth" isDateField={true} label="Birth Date" />
											<FormTextField
												name="gender"
												isGender={true}
												label="Gender"
												arrayGender={[
													{ label: 'Male', value: 'male' },
													{ label: 'Female', value: 'female' },
													{ label: 'Unidentified', value: 'unidentified' }
												]}
												formik={formik}
											/>
										</Flex>
										<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
											<FormTextField name="email" label="Email" type="email" placeholder="abc@gmail.com" leftIcon={<MdOutlineAlternateEmail color="#999" fontSize="1.1rem" />} />
										</Flex>
										<FormTextField name="location" isAddress={true} formik={formik} />
										<FormTextField name="address" isTextAreaField={true} label="Address" placeholder="Enter your address" />
									</Stack>
								</Stack>
								<ChakraAlertDialog
									title="Save profile detail"
									message="Are you sure? This action will save your profile details."
									isOpen={isSaveDetailAlertOpen}
									onClose={onSaveDetailAlertClose}
									acceptButtonLabel="Accept"
									type="submit"
									onAccept={formik.handleSubmit}
									acceptButtonColor="blue"
								/>
							</>
						)}
					</Formik>
					<Stack bgColor="white" flex="1" border="0.5px solid #cfd3df" rounded="lg" shadow="2xl">
						<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#00AF91" height="65px" borderRadius="10px 10px 0 0">
							<Flex flex="8" alignItems="center" gap="2">
								<Heading fontSize="xl" color="white" overflow="hidden" whiteSpace="nowrap">
									Your Photo
								</Heading>
							</Flex>
						</Flex>
						<Flex flexDirection="column" p={4} px={8} gap={10}>
							<Flex alignItems="center" flex={1} gap={3} py={2} flexDirection="column">
								<Flex gap={4} flexDirection="row" alignItems="center" className="pb-4">
									<AvatarWithPreview alt="avatar" altBoxSide="8px" className=" h-[120px] w-[120px] rounded-md" />
									<Box display="flex" flexDirection="column" gap={1} fontSize="large">
										<Text fontWeight="medium" fontSize="md">
											Edit your photo
										</Text>
										<Button colorScheme="green" isDisabled={images?.length === 0} onClick={(e) => handleSaveUploadImages(e)}>
											Save this photo
										</Button>
									</Box>
								</Flex>
								<Box w={{ base: '100%', md: '80%' }} height="360px">
									<ImagesUploading images={images} onChange={onChange} maxNumber={maxNumber} />
								</Box>
							</Flex>
						</Flex>
					</Stack>
				</Flex>
			</Stack>
		);
	} else if (isFirstTimeLogin && !isFetchingProfileDetail) {
		return (
			<Stack spacing={2} className="ml-1">
				{isFirstTimeLogin && !isAlrUploadImage && (
					<Flex alignItems="center" justifyContent="center">
						<Box p="15px" bg="yellow.100" rounded="md" shadow="xl">
							<Heading fontSize="xl" fontWeight="medium">
								<Highlight
									query={['Your Photo']}
									styles={{
										px: '2',
										py: '1',
										rounded: 'md',
										bg: 'white',
										color: 'black',
										fontWeight: 'bold',
										fontSize: 'xl'
									}}
								>
									Please upload Your Photo in your first time of update the Profile!
								</Highlight>
							</Heading>
						</Box>
					</Flex>
				)}
				<Stack className="mt-2">
					<Flex
						gap={8}
						flexDirection={{
							base: 'column',
							xl: 'row'
						}}
					>
						{isAlrUploadImage && (
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={(values) => {
									onSaveDetailAlertClose();
									const profileDetail = {
										fullname: values?.fullname,
										email: values?.email,
										gender: values?.gender,
										dateOfBirth: values?.dateOfBirth !== '' ? new Date(values?.dateOfBirth).toISOString() : '',
										phoneNumber: values?.phone,
										location: {
											address: values?.address,
											city: values?.location?.city ?? '',
											country: values?.location?.country ?? '',
											state: values?.location?.state ?? ''
										}
									};
									const profileDetailObj = {
										id: userDecodeData?.id,
										profileDetail: profileDetail
									};
									useSaveProfileDetail.mutate(profileDetailObj);
								}}
							>
								{(formik) => (
									<>
										<Stack bgColor="white" flex="1" border="0.5px solid #cfd3df" rounded="lg" as="form" shadow="2xl">
											<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#00AF91" height="65px" borderRadius="10px 10px 0 0">
												<Flex flex="8" alignItems="center" gap="2">
													<Heading fontSize="xl" color="white" overflow="hidden" whiteSpace="nowrap">
														Personal Information
													</Heading>
												</Flex>
												<Spacer />
												<Flex flex="1" pl="5px">
													<Button onClick={formik.isValid ? onSaveDetailAlertOpen : formik.handleSubmit} colorScheme="green">
														Save
													</Button>
												</Flex>
											</Flex>
											<Stack spacing={2} p={4} px={8}>
												<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
													<FormTextField name="fullname" label="Full Name" placeholder="Enter your Full Name" leftIcon={<FaRegUserCircle color="#999" fontSize="1.1rem" />} />
													<FormTextField name="email" label="Email" type="email" placeholder="abc@gmail.com" leftIcon={<MdOutlineAlternateEmail color="#999" fontSize="1.1rem" />} />
												</Flex>
												<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
													<FormTextField name="dateOfBirth" isDateField={true} label="Birth Date" />
													<FormTextField
														name="gender"
														isGender={true}
														label="Gender"
														arrayGender={[
															{ label: 'Male', value: 'male' },
															{ label: 'Female', value: 'female' }
														]}
														formik={formik}
													/>
												</Flex>
												<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
													<FormTextField name="role" label="Role" isReadOnly={true} type="text" leftIcon={<RiFolderUserLine color="#999" fontSize="1.1rem" />} />
													<FormTextField name="phone" label="Phone number" type="text" placeholder="Enter your number" leftIcon={<AiFillPhone color="#999" fontSize="1.1rem" />} />
												</Flex>

												<FormTextField name="location" isAddress={true} formik={formik} />
												<FormTextField name="address" isTextAreaField={true} label="Address" placeholder="Enter your address" />
											</Stack>
										</Stack>
										<ChakraAlertDialog
											title="Save profile detail"
											message="Are you sure? This action will save your profile details."
											isOpen={isSaveDetailAlertOpen}
											onClose={onSaveDetailAlertClose}
											acceptButtonLabel="Accept"
											type="submit"
											onAccept={formik.handleSubmit}
											acceptButtonColor="blue"
										/>
									</>
								)}
							</Formik>
						)}
						<Stack bgColor="white" flex="1" border="0.5px solid #cfd3df" rounded="lg" shadow="2xl">
							<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#00AF91" height="65px" borderRadius="10px 10px 0 0">
								<Flex flex="8" alignItems="center" gap="2">
									<Heading fontSize="xl" color="white" overflow="hidden" whiteSpace="nowrap">
										Your Photo
									</Heading>
								</Flex>
							</Flex>
							<Flex flexDirection="column" p={4} px={8} gap={10}>
								<Flex alignItems="center" flex={1} gap={3} py={2} flexDirection="column">
									<Flex gap={4} flexDirection="row" alignItems="center" className="pb-4">
										<AvatarWithPreview src={profileDetailData?.result?.image + '?' + dayjs()} alt="avatar" altBoxSide="80px" className=" h-[120px] w-[120px] rounded-md" />
										<Box display="flex" flexDirection="column" gap={1} fontSize="large">
											<Text fontWeight="medium" fontSize="md">
												Edit your photo
											</Text>
											<Button colorScheme="green" isDisabled={images?.length === 0} onClick={(e) => handleSaveUploadImages(e)}>
												Save this photo
											</Button>
										</Box>
									</Flex>
									<Box w={{ base: '100%', md: '80%' }} height="360px">
										<ImagesUploading images={images} onChange={onChange} maxNumber={maxNumber} />
									</Box>
								</Flex>
							</Flex>
						</Stack>
					</Flex>
				</Stack>
			</Stack>
		);
	}
}

export default ProfileSettings;
