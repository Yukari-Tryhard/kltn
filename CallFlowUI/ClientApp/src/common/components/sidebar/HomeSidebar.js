import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Icon, useDisclosure, useToast, Tooltip } from '@chakra-ui/react';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from 'react-icons/bs';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { Sidebar, SubMenu, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';

import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';

import AvatarWithPreview from '../../components/AvatarWithPreview';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SideBarData } from '../../../data/SideBarData';
import { Helper } from '../../../helper/Helper';

function HomeSidebar() {
	const [userAvatar, setUserAvatar] = useState();
	const { collapseSidebar, collapsed } = useProSidebar();
	const toast = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { isOpen: isSignOutAlertOpen, onOpen: onSignOutAlertOpen, onClose: onSignOutAlertClose } = useDisclosure();

	const useLogoutMutation = useMutation({
		onSuccess: (data) => {
			//dispatch(setUser(null));
			navigate('/sign-in');
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
		<div
			style={{
				display: 'flex',
				height: '100%',
				top: 0,
				bottom: 0,
				zIndex: 10000
			}}
		>
			<Sidebar rootStyles={{ overflowY: 'overlay' }} customBreakPoint="1005px" collapsedWidth="60px" width="240px" backgroundColor="white">
				<Menu>
					{!collapsed && (
						<Flex alignItems="center" justifyContent="start" gap="2" padding="2" bg="#1C6758">
							<Flex flex="8" alignItems="center" gap="2">
								<Flex pr="5px" pl="5px" pt="5px" pb="5px">
									<AvatarWithPreview alt="avatar" altBoxSize="40px" />
								</Flex>
								<Box display="flex" flexDirection="column">
									<Heading fontSize="large" color="white" overflow="hidden" width="124px" textOverflow="ellipsis" whiteSpace="nowrap">
										ducntm
									</Heading>
								</Box>
							</Flex>
							<Tooltip placement="right" hasArrow label="Minimize the side bar">
								<Flex flex="2">
									<Icon onClick={() => collapseSidebar()} cursor="pointer" fontSize="20px" color="white" as={IoReorderThreeOutline} />
								</Flex>
							</Tooltip>
						</Flex>
					)}
					{collapsed && (
						<Flex alignItems="center" justifyContent="start" gap="2" padding="2" bg="#1C6758">
							<Tooltip placement="right" hasArrow label="Expand the side bar">
								<Flex pr="5px" pl="5px" pt="5px" pb="5px" justifyContent="center" w="100%">
									<Icon onClick={() => collapseSidebar()} cursor="pointer" fontSize="23px" color="white" as={IoReorderThreeOutline} />
								</Flex>
							</Tooltip>
						</Flex>
					)}

					<Menu
						menuItemStyles={{
							SubMenuExpandIcon: {
								justifyContent: 'center',
								color: '#1C6758',
								fontSize: '12px'
							},
							button: ({ level, active }) => {
								if (level === 0)
									return {
										backgroundColor: active ? '#B1D7B4' : undefined,
										color: active ? '#D6CDA4' : undefined
									};
								if (level === 1)
									return {
										backgroundColor: active ? '#B1D7B4' : undefined,
										color: active ? '#D6CDA4' : undefined
									};
							}
						}}
					>
						{SideBarData.map((parentItem, index) => {
							if (parentItem.children) {
								return (
									<SubMenu
										key={index}
										label={
											<Flex alignItems="center" justifyContent="start">
												<Box flex="20%" display="grid" placeItems="start">
													{parentItem.icon}
												</Box>
												{!collapsed && (
													<Box flex="80%" fontSize="1rem" fontWeight="medium">
														{parentItem.title}
													</Box>
												)}
											</Flex>
										}
									>
										{parentItem.children &&
											parentItem.children.map((childItem, index) => {
												if (childItem?.roleCanAccess) {
													return (
														<MenuItem active={location.pathname === `/${parentItem.url}/${childItem.url}` ? true : false} key={index} component={<NavLink to={`${parentItem.url}/${childItem.url}`} />}>
															<Flex alignItems="center">
																<Box flex="20%" display="grid" placeItems="start">
																	{childItem.icon}
																</Box>
																<Box flex="80%" fontSize="1rem" fontWeight="medium">
																	{childItem.title}
																</Box>
															</Flex>
														</MenuItem>
													);
												} else {
													return (
														<MenuItem active={location.pathname === `/${parentItem.url}/${childItem.url}` ? true : false} key={index} component={<NavLink to={`${parentItem.url}/${childItem.url}`} />}>
															<Flex alignItems="center">
																<Box flex="20%" display="grid" placeItems="start">
																	{childItem.icon}
																</Box>
																<Box flex="80%" fontSize="0.9rem" fontWeight="medium" placeItems="center">
																	{childItem.title}
																</Box>
															</Flex>
														</MenuItem>
													);
												}
											})}
									</SubMenu>
								);
							} else {
								return (
									<MenuItem active={location.pathname === `/${parentItem.url}` ? true : false} key={index} component={<NavLink to={parentItem.url} />}>
										<Flex alignItems="center" justifyContent="start">
											<Box flex="20%" display="grid" placeItems="start">
												{parentItem.icon}
											</Box>
											{!collapsed && (
												<Box flex="80%" fontSize="1rem" fontWeight="medium">
													{parentItem.title}
												</Box>
											)}
										</Flex>
									</MenuItem>
								);
							}
						})}
						<MenuItem onClick={onSignOutAlertOpen} key="sign-out">
							<Flex alignItems="center" justifyContent="center" textAlign="start">
								<Box flex="20%" display="grid" placeItems="start">
									<RiLogoutCircleRLine fontSize="18px" textAlign="center" />
								</Box>
								{!collapsed && (
									<Box flex="80%" fontSize="1rem" fontWeight="medium">
										Sign out
									</Box>
								)}
							</Flex>
						</MenuItem>
						<ChakraAlertDialog
							title="Sign out account"
							message="Are you sure? This action will sign out your account."
							isOpen={isSignOutAlertOpen}
							onClose={onSignOutAlertClose}
							onAccept={handleLogout}
							acceptButtonLabel="Accept"
							acceptButtonColor="blue"
						/>
					</Menu>
				</Menu>
			</Sidebar>
			<Box className="Main-content" flex="1" minWidth="0" minHeight="100vh" bgColor="rgb(249, 249, 249, 0.7)" backgroundPosition="bottom" backgroundSize="auto">
				<Outlet />
			</Box>
		</div>
	);
}

export default HomeSidebar;
