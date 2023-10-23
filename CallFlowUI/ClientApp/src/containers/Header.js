import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

// Decoration
import { Box, Flex, useToast, useDisclosure } from '@chakra-ui/react';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { themeChange } from 'theme-change';

import { openRightDrawer } from '../store/common/RightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../helper/GlobalConstantUtil';
import AvatarWithPreview from '../common/components/AvatarWithPreview';
import ChakraAlertDialog from '../common/components/dialog/ChakraAlertDialog';
import LoadingSpinner from '../common/components/LoadingSpinner';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
	const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
	const { isOpen: isSignOutAlertOpen, onOpen: onSignOutAlertOpen, onClose: onSignOutAlertClose } = useDisclosure();

	// Opening right sidebar for notification
	const openNotification = () => {
		dispatch(openRightDrawer({ header: 'Notifications', bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
	};

	function logoutUser() {
		localStorage.clear();
		window.location.href = '/';
	}

	const useLogoutMutation = useMutation({
		onSuccess: (data) => {
			//dispatch(setUser(null));
			localStorage.clear();
			window.location.href = '/';
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
		useLogoutMutation.mutate();
	};

	useEffect(() => {}, []);

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
				<div className="">
					<label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
						<Bars3Icon className="h-5 inline-block w-5" />
					</label>
					<h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
				</div>

				<div className="order-last">
					{/* Notification icon */}
					<button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
						<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
							<BellIcon className="h-6 w-6" />
							{noOfNotifications > 0 ? (
								<span className="indicator-item badge badge-secondary badge-sm" style={{ position: 'absolute', top: '-0.5rem', right: '-1rem' }}>
									{noOfNotifications}
								</span>
							) : null}
						</div>
					</button>

					{/* Profile icon, opening menu on click */}
					<div className="dropdown dropdown-end ml-2">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<Flex pr="5px" pl="5px" pt="5px" pb="5px">
								<AvatarWithPreview alt="avatar" altBoxSize="30px" />
							</Flex>
						</label>
						<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<li className="justify-between">
								<Link to={'/app/settings-profile'}>Profile Settings</Link>
							</li>
							<div className="divider mt-0 mb-0"></div>
							<li>
								<button onClick={onSignOutAlertOpen} className="text-blue-500 hover:underline cursor-pointer">
									Logout
								</button>
								<ChakraAlertDialog
									title="Sign out account"
									message="Are you sure? This action will sign out your account."
									isOpen={isSignOutAlertOpen}
									onClose={onSignOutAlertClose}
									onAccept={handleLogout}
									acceptButtonLabel="Accept"
									acceptButtonColor="blue"
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
