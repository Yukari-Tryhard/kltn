import React from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';

import { Box, Flex, Heading, Icon, Tooltip, Spacer } from '@chakra-ui/react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { Sidebar, SubMenu, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

import routes from '../../routes/AppSidebar';

function LeftSidebar() {
	const location = useLocation();
	const { collapseSidebar, collapsed } = useProSidebar();

	return (
		<div
			className=" justify-between bg-base-100 z-10 shadow-md"
			style={{
				display: 'flex',
				height: '100%',
				width: '100%'
			}}
		>
			<Sidebar rootStyles={{ overflowY: 'overlay' }} customBreakPoint="1005px" collapsedWidth="64px" width="240px" backgroundColor="bg-base-100">
				<Menu>
					{!collapsed && (
						<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#1C6758" height="65px">
							<Flex flex="8" alignItems="center" gap="2">
								{/* <Image className="flex absolute start-[-10%] w-[12rem] h-[12rem]" src={LogoWhite}></Image> */}
								<Link to={'/app/dashboard'}>
									<Heading fontSize="x-large" color="white" overflow="hidden" width="124px" textOverflow="ellipsis" whiteSpace="nowrap">
										FlowDG
									</Heading>
								</Link>
							</Flex>
							<Spacer />
							<Tooltip placement="right" hasArrow label="Minimize the side bar">
								<Flex flex="1" pl="5px">
									<Icon onClick={() => collapseSidebar()} cursor="pointer" fontSize="20px" color="white" as={IoReorderThreeOutline} />
								</Flex>
							</Tooltip>
						</Flex>
					)}
					{collapsed && (
						<Flex alignItems="center" justifyContent="center" gap="2" padding="4" bg="#1C6758" height="65px">
							<Tooltip placement="right" hasArrow label="Expand the side bar">
								<Flex pr="5px" pl="5px" pt="5px" pb="5px" justifyContent="center" w="100%">
									<Icon onClick={() => collapseSidebar()} cursor="pointer" fontSize="23px" color="white" as={IoReorderThreeOutline} />
								</Flex>
							</Tooltip>
						</Flex>
					)}
				</Menu>
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
					{routes.map((parentItem, index) => {
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
													{parentItem.name}
												</Box>
											)}
										</Flex>
									}
								>
									{parentItem.children &&
										parentItem.children.map((childItem, index) => {
											if (childItem?.roleCanAccess) {
												return (
													<MenuItem active={location.pathname === `/${parentItem.url}/${childItem.url}` ? true : false} key={index} component={<NavLink to={`${childItem.path}`} />}>
														<Flex alignItems="center">
															<Box flex="20%" display="grid" placeItems="start">
																{childItem.icon}
															</Box>
															<Box flex="80%" fontSize="1rem" fontWeight="medium">
																{childItem.name}
															</Box>
														</Flex>
													</MenuItem>
												);
											} else {
												return (
													<MenuItem active={location.pathname === `/${childItem.path}` ? true : false} key={index} component={<NavLink to={`${childItem.path}`} />}>
														<Flex alignItems="center">
															<Box flex="20%" display="grid" placeItems="start">
																{childItem.icon}
															</Box>
															<Box flex="80%" fontSize="0.9rem" fontWeight="medium" placeItems="center">
																{childItem.name}
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
								<MenuItem active={location.pathname === `app/${parentItem.path}` ? true : false} key={index} component={<NavLink to={parentItem.path} />}>
									<Flex alignItems="center" justifyContent="start">
										<Box flex="20%" display="grid" placeItems="start">
											{parentItem.icon}
										</Box>
										{!collapsed && (
											<Box flex="80%" fontSize="1rem" fontWeight="medium">
												{parentItem.name}
											</Box>
										)}
									</Flex>
								</MenuItem>
							);
						}
					})}
				</Menu>
			</Sidebar>
			<Box flex="1" backgroundColor="bg-base-100" minWidth="0" minHeight="100vh" backgroundPosition="bottom" backgroundSize="auto">
				<Outlet />
			</Box>
		</div>
	);
}

export default LeftSidebar;
