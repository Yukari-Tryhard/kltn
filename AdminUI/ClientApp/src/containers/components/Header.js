import React, { useEffect } from 'react';
import {
	Link
	//useNavigate
} from 'react-router-dom';
import { useMutation } from 'react-query';
import {
	useSelector
	//useDispatch
} from 'react-redux';

// Decoration
import { Box, Flex, useToast, useDisclosure } from '@chakra-ui/react';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import AvatarWithPreview from '../../common/components/AvatarWithPreview';
import ChakraAlertDialog from '../../common/components/dialog/ChakraAlertDialog';
import LoadingSpinner from '../../common/components/LoadingSpinner';

function Header() {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	const toast = useToast();

	const { pageTitle } = useSelector((state) => state.header);
	const { isOpen: isSignOutAlertOpen, onOpen: onSignOutAlertOpen, onClose: onSignOutAlertClose } = useDisclosure();

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
		logoutUser();
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
