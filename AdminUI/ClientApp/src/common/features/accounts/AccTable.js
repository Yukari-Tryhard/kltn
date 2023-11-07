import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Country, State } from 'country-state-city';

import { Box, Flex, Heading, Stack, useDisclosure, useToast } from '@chakra-ui/react';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephone, BsFillShieldLockFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { showNotification } from '../../../modules/store/common/HeaderSlice';
import TitleCard from '../../components/cards/TitleCard';
import DynamicTable from '../../components/tables/DynamicTable';
import DynamicDrawer from '../../components/tables/DynamicDrawer';
import LoadingSpinner from '../../components/LoadingSpinner';
import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';

import { Helper } from '../../../helper/Helper';

import { ACCOUNT_MANAGEMENT } from '../../../helper/constants/DummyData';
import AccTopSideButtons from './AccTopSideButtons';

function AccTable() {
	//* #region declare variables
	const toast = useToast();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const [editData, setEditData] = useState({});
	const [deleteSingleData, setDeleteSingleData] = useState({});
	const [account, setAccounts] = useState(ACCOUNT_MANAGEMENT);
	//const [listAccountArray, setListAccountArray] = useState([]);
	//* #endregion

	//* #region hooks
	const {
		//data: dataListAccount,
		isLoading: isLoadingListAccount
		//isFetching: isFetchingListAccount
	} = useQuery(
		'listAccount',
		//accountService.getListAccount,
		{
			refetchOnWindowFocus: false,
			retry: 1
		}
	);

	// useEffect(() => {
	// 	setListAccountArray(Helper.convertToArraySelection(dataListAccount?.result, 'companyName', 'companyId'));
	// }, [dataListAccount]);

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
	const removeFilter = () => {
		setAccounts(ACCOUNT_MANAGEMENT);
	};

	const applySearch = (value) => {
		let filteredAccounts = account.filter((t) => {
			return t.companyName.toLowerCase().includes(value.toLowerCase());
		});
		setAccounts(filteredAccounts);
	};
	const updateAccountStatus = (index) => {
		let dashboard = account[index];
		setAccounts(
			account.map((account, idx) => {
				if (idx === index) return { ...account, active: !account.active };
				return account;
			})
		);
		dispatch(showNotification({ message: `${dashboard.companyName} ${dashboard.active ? 'is now Disabled' : 'is now Active'}`, status: 1 }));
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
			name: 'companyName',
			label: 'Company Name',
			placeholder: 'Company Name',
			isRequired: true,
			leftIcon: <FaRegUserCircle color="#999" fontSize="1.2rem" />
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Email address',
			isRequired: true,
			isReadOnly: Object.keys(editData).length === 0 ? false : true,
			leftIcon: <MdOutlineAlternateEmail color="#999" fontSize="1.2rem" />
		},
		{
			name: 'password',
			label: 'Password',
			placeholder: 'Password',
			isRequired: true,
			isPassword: 'true',
			leftIcon: <BsFillShieldLockFill color="#999" fontSize="1.2rem" />,
			rightIcon: <BsEyeFill color="#999" fontSize="1.2rem" />,
			hideIcon: <BsEyeSlashFill color="#999" fontSize="1.2rem" />
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			placeholder: 'Confirm Password',
			isPassword: 'true',
			isRequired: true,
			leftIcon: <BsFillShieldLockFill color="#999" fontSize="1.2rem" />,
			rightIcon: <BsEyeFill color="#999" fontSize="1.2rem" />,
			hideIcon: <BsEyeSlashFill color="#999" fontSize="1.2rem" />
		},
		{
			name: 'phoneNumber',
			label: 'Phone',
			type: 'type',
			placeholder: 'Phone Number',
			isRequired: true,
			leftIcon: <BsTelephone color="#999" fontSize="1.4rem" />
		},
		{
			isTextAreaField: true,
			name: 'address',
			label: 'Address',
			height: '130px',
			placeholder: 'Address',
			isRequired: true
		}
	];
	const initialValues = {
		accountName: `${editData.accountName ? editData.accountName : ''}`,
		organization: `${editData?.account?.accountId ? editData?.account?.accountId : ''}`,
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
		<TitleCard title="Accounts Management" topMargin="mt-2" TopSideButtons={<AccTopSideButtons applySearch={applySearch} removeFilter={removeFilter} onAddEditOpen={onAddEditOpen} />}>
			{useCreateAccount.isLoading || useSaveAccount.isLoading ? (
				<LoadingSpinner />
			) : (
				<Box marginTop="0px !important">
					{
						// dataListAccount?.result?.data &&
						account && (
							<DynamicTable
								handleDeleteRange={DeleteRange}
								handleSwitchStatus={updateAccountStatus}
								tableRowAction={tableRowAction}
								columns={columns}
								data={
									//dataListAccount?.result?.data
									account
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
