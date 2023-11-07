import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';

import { authService } from '../../modules/services/AuthService';
import { useGetProfileDetail } from '../../modules/services/ProfileService';
import { setUser } from '../../modules/store/AuthSlice';

import { Box, Flex, useToast, useDisclosure } from '@chakra-ui/react';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import AvatarWithPreview from '../../common/components/AvatarWithPreview';
import ChakraAlertDialog from '../../common/components/dialog/ChakraAlertDialog';
import LoadingSpinner from '../../common/components/LoadingSpinner';

import { Helper } from '../../helper/Helper';
import { JWT_AUTHENTICATION, ACCESS_TOKEN, SIGN_IN } from '../../modules/services/common/AxiosInstance';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const cookies = new Cookies();
	const decoded = Helper.getUseDecodeInfo();

	const [userAvatar, setUserAvatar] = useState();
	const { pageTitle } = useSelector((state) => state.header);
	const { data: profileDetailData, isFetching: isFetchingProfileDetailData } = useGetProfileDetail(decoded?.id ?? 0);
	const { isOpen: isSignOutAlertOpen, onOpen: onSignOutAlertOpen, onClose: onSignOutAlertClose } = useDisclosure();

	const useLogoutMutation = useMutation(authService.logout, {
		onSuccess: (data) => {
			dispatch(setUser(null));
			navigate(SIGN_IN);
			toast({
				title: 'Sign Out Successfully',
				position: 'bottom-right',
				status: 'success',
				isClosable: true,
				duration: 5000
			});
		},
		onError: (error) => {
			console.log(error);
		}
	});

	const handleLogout = () => {
		const accessTokenJSON = localStorage.getItem(ACCESS_TOKEN);
		const accessToken = JSON.parse(accessTokenJSON);
		const refreshToken = cookies.get(JWT_AUTHENTICATION);
		useLogoutMutation.mutate({ accessToken, refreshToken });
	};

	useEffect(() => {
		if (profileDetailData?.result?.image) {
			setUserAvatar(profileDetailData?.result?.image + '?' + dayjs());
		}
	}, [isFetchingProfileDetailData, profileDetailData?.result?.image]);

	if (useLogoutMutation.isLoading)
		return (
			<Box h="100vh" w="100vw">
				<LoadingSpinner />
			</Box>
		);
	return (
		<>
			<div className="navbar flex justify-between bg-base-100 z-10 shadow-md ">
				{/* Menu toggle for mobile view or small screen */}
				<div>
					<label htmlFor="left-sidebar-drawer" className="btn btn-menu drawer-button lg:hidden">
						<Bars3Icon className="inline-block h-5 w-5 " />
					</label>
					<h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
				</div>

				<div className="order-last">
					{/* Profile icon, opening menu on click */}
					<div className="dropdown dropdown-end ml-2">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<Flex pr="5px" pl="5px" pt="5px" pb="5px">
								<AvatarWithPreview alt="avatar" altBoxSize="30px" src={userAvatar} />
							</Flex>
						</label>
						<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<li className="justify-between">
								<Link to={'/app/settings-profile'}>Profile Settings</Link>
							</li>
							<div className="divider mt-0 mb-0"></div>
							<li>
								<button onClick={onSignOutAlertOpen} className="text-green-500 bold hover:text-green hover:no-underline cursor-pointer">
									Logout
								</button>
								<ChakraAlertDialog
									title="Sign out account"
									message="Are you sure? This action will sign out your account."
									isOpen={isSignOutAlertOpen}
									onClose={onSignOutAlertClose}
									onAccept={handleLogout}
									acceptButtonLabel="Accept"
									acceptButtonColor="green"
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
