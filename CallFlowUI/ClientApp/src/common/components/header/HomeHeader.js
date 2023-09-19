import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Box, Flex, Heading, Icon, Text, Menu, MenuButton, MenuItem, MenuList, useToast, Show, Tooltip, Wrap, Hide, useDisclosure } from '@chakra-ui/react';
import { useProSidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useMutation } from 'react-query';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';

import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';
import LoadingSpinner from '../../components/LoadingSpinner';

function HomeHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const cookies = new Cookies();
    const [userAvatar, setUserAvatar] = useState();

    const { collapseSidebar, toggleSidebar, toggled } = useProSidebar();
    const { isOpen: isSignOutAlertOpen, onOpen: onSignOutAlertOpen, onClose: onSignOutAlertClose } = useDisclosure();

    const handleCollapseSidebar = () => {
        collapseSidebar();
        if (!toggled) {
            toggleSidebar();
        }
    };

    const useLogoutMutation = useMutation({
        onSuccess: (data) => {
            // dispatch(setUser(null));
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
        const accessTokenJSON = localStorage.getItem('accessToken');
        const accessToken = JSON.parse(accessTokenJSON);
        const refreshToken = cookies.get('jwt_authentication');
        useLogoutMutation.mutate({ accessToken, refreshToken });
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
            <Show breakpoint="(max-width: 1005px)">
                <Flex className="home-header" paddingX={2} paddingY={3} bgColor="primary2" color="white" flexDirection="row" alignContent="center" position="sticky" inset={0} zIndex="100">
                    <Flex className="header-nav-left" gap={5} alignItems="center" width="241.2px">
                        <Flex flex={1} justifyContent="center">
                            <Tooltip placement="bottom" hasArrow label="Go to dashboard page">
                                <Heading cursor="pointer" onClick={() => navigate('/dashboard')} fontSize="2xl">
                                    Dashboard
                                </Heading>
                            </Tooltip>
                        </Flex>
                    </Flex>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flex: '1',
                            gap: '10px'
                        }}
                    >
                        <Tooltip placement="bottom" hasArrow label="Showing the side bar">
                            <Wrap>
                                <Icon
                                    onClick={() => {
                                        handleCollapseSidebar();
                                    }}
                                    as={BsLayoutSidebarInsetReverse}
                                    boxSize={8}
                                    _hover={{
                                        cursor: 'pointer'
                                    }}
                                />
                            </Wrap>
                        </Tooltip>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Menu>
                                <MenuButton>
                                    <Flex _hover={{ cursor: 'pointer' }} alignItems="center" gap="4px">
                                        <Avatar size="sm" border="2px solid white" src={userAvatar} />
                                        <Hide below="sm">
                                            <Text fontSize="1.2rem">minhducnt</Text>
                                        </Hide>
                                        <Icon as={MdKeyboardArrowDown} boxSize={8} />
                                    </Flex>
                                </MenuButton>
                                <MenuList color="black">
                                    <Link to="/setting/profile">
                                        <MenuItem>Profile</MenuItem>
                                    </Link>
                                    <MenuItem onClick={onSignOutAlertOpen}>Sign Out</MenuItem>
                                </MenuList>
                            </Menu>
                            <ChakraAlertDialog
                                title="Sign out account"
                                message="Are you sure? This action will sign out your account."
                                isOpen={isSignOutAlertOpen}
                                onClose={onSignOutAlertClose}
                                onAccept={handleLogout}
                                acceptButtonLabel="Accept"
                                acceptButtonColor="blue"
                            />
                        </div>
                    </div>
                </Flex>
            </Show>
        </>
    );
}

export default HomeHeader;
