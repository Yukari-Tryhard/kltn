import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Country, State } from 'country-state-city';

import { Box, Flex, Heading, Stack, useDisclosure, useToast } from '@chakra-ui/react';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephone, BsFillShieldLockFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { showNotification } from '../../../store/common/HeaderSlice';
import TitleCard from '../../components/cards/TitleCard';
import DynamicTable from '../../components/tables/DynamicTable';
import DynamicDrawer from '../../components/tables/DynamicDrawer';
import LoadingSpinner from '../../components/LoadingSpinner';
import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';

import { Helper } from '../../../helper/Helper';

import { ACCOUNT_MANAGEMENT } from '../../../helper/DummyData';
import AccTopSideButtons from './AccTopSideButtons';

function AccTable() {
	//* #region declare variables
	const toast = useToast();
	const queryClient = useQueryClient();
	const [editData, setEditData] = useState({});
	const [deleteSingleData, setDeleteSingleData] = useState({});
	const account = useState(ACCOUNT_MANAGEMENT);

	//* #endregion

	//* #region hooks

	const {
		data: dataListAccount,
		isLoading: isLoadingListAccount
		//isFetching: isFetchingListAccount
	} = useQuery(
		'listAccount',
		// accountService.getListAccount,
		{
			refetchOnWindowFocus: false,
			retry: 1
		}
	);
	const [listAccountArray, setListAccountArray] = useState([]);
	useEffect(() => {
		setListAccountArray(Helper.convertToArraySelection(dataListAccount?.result, 'organizationName', 'organizationId'));
	}, [dataListAccount]);

	const useCreateAccount = useMutation(
		// accountService.createAccountService,
		{
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
					queryClient.invalidateQueries('listAccount');
					toast({
						title: 'Create Account Successfully',
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
		}
	);
	const useDeleteAccount = useMutation(
		// accountService.deleteAccount,
		{
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
					queryClient.invalidateQueries('listAccount');
					toast({
						title: 'Delete Account Successfully',
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
		}
	);
	const useSaveAccount = useMutation(
		// accountService.saveAccountService,
		{
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
					queryClient.invalidateQueries('listAccount');
					toast({
						title: 'Save Account Successfully',
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
		}
	);
	const { isOpen: isDeleteSingleOpen, onOpen: onDeleteSingleOpen, onClose: onDeleteSingleClose } = useDisclosure();
	const { isOpen: isAddEditOpen, onOpen: onAddEditOpen, onClose: onAddEditClose } = useDisclosure();
	//* #endregion

	//* #region functions
	const DeleteRange = (data) => {
		console.log('handleDeleteRange', data);
	};
	const Delete = (row) => {
		setDeleteSingleData(row.accountId);
		onDeleteSingleOpen();
	};
	const handleAcceptDelete = () => {
		useDeleteAccount.mutate(deleteSingleData);
		setDeleteSingleData({});
		onDeleteSingleClose();
	};
	const Edit = (row) => {
		onAddEditOpen();
		setEditData(row);
	};
	const convertAccountObject = (values) => {
		let accountLocation = values['location'];
		let organizationId = values['organization'];
		accountLocation['address'] = values['address'];
		delete values['address'];
		delete values['location'];
		const accountObj = {
			...values,
			location: { ...accountLocation },
			organization: { organizationId }
		};
		return accountObj;
	};
	const handleCreateAccount = (values) => {
		const accountObj = convertAccountObject(values);
		useCreateAccount.mutate(accountObj);
		closeDrawer();
	};
	const handleEditAccount = (values) => {
		const id = editData.accountId;
		const accountObj = convertAccountObject(values);
		useSaveAccount.mutate({ id, accountObj });
		closeDrawer();
	};
	const closeDrawer = () => {
		onAddEditClose();
		setEditData({});
	};
	//* #endregion

	//* #region table
	const tableRowAction = [
		{
			actionName: 'Edit',
			func: Edit
		},
		{
			actionName: 'Delete',
			func: Delete
		}
	];
	const columns = React.useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'companyId',
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
				hidden: true
			},
			{
				Header: 'Name',
				accessor: 'companyName'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'Email',
				accessor: 'email'
				// haveFilter: {
				//   filterType: FilterType.Default,
				// },
				// haveSort: true,
				//Cell: ({ value }) => <span>{value?.organizationName}</span>,
			},
			{
				Header: 'Address',
				accessor: 'address'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'Phone Number',
				accessor: 'phoneNumber'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'Active',
				accessor: 'active'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			}
		],
		[]
	);
	//* #endregion

	//* #region drawer
	const drawerFieldData = [
		{
			name: 'accountName',
			label: 'Account Name',
			placeholder: 'Enter your Account Name',
			leftIcon: <FaRegUserCircle color="#999" fontSize="1.5rem" />
		},
		{
			name: 'organization',
			label: 'Account',
			placeholder: '---',
			isSelectionField: true,
			selectionArray: listAccountArray ? [...listAccountArray] : []
		},
		{
			name: 'location',
			isAddress: true
		},
		{
			isTextAreaField: true,
			name: 'address',
			label: 'Address',
			height: '130px',
			placeholder: 'Enter your address'
		}
	];
	const initialValues = {
		accountName: `${editData.accountName ? editData.accountName : ''}`,
		organization: `${editData?.account?.accountId ? editData?.account?.accountId : ''}`,
		location: {
			country: `${editData['location.country'] ?? ''}`,
			state: `${editData['location.state'] ?? ''}`,
			city: `${editData['location.city'] ?? ''}`
		},
		address: `${editData['location.address'] ? editData['location.address'] : ''}`
	};
	const validationSchema = Yup.object().shape({
		accountName: Yup.string().required('This field is required'),
		organization: Yup.string().required('This field is required'),
		address: Yup.string().required('This field is required')
	});
	//* #endregion

	if (isLoadingListAccount) return <LoadingSpinner />;
	return (
		<TitleCard title="Accounts Management" topMargin="mt-2" TopSideButtons={<AccTopSideButtons />}>
			{useCreateAccount.isLoading || useSaveAccount.isLoading ? (
				<LoadingSpinner />
			) : (
				<Box marginTop="0px !important">
					{
						// dataListAccount?.result?.data &&
						account[0] && (
							<DynamicTable
								onAddEditOpen={onAddEditOpen}
								handleDeleteRange={DeleteRange}
								tableRowAction={tableRowAction}
								columns={columns}
								data={
									//dataListAccount?.result?.data
									account[0]
								}
							/>
						)
					}
					<DynamicDrawer
						handleEdit={handleEditAccount}
						handleCreate={handleCreateAccount}
						isAddEditOpen={isAddEditOpen}
						onAddEditClose={onAddEditClose}
						editData={editData}
						setEditData={setEditData}
						validationSchema={validationSchema}
						initialValues={initialValues}
						drawerFieldData={drawerFieldData}
					/>
					<ChakraAlertDialog title="Delete Single" isOpen={isDeleteSingleOpen} onClose={onDeleteSingleClose} onAccept={handleAcceptDelete} />
				</Box>
			)}
		</TitleCard>
	);
}

export default AccTable;
