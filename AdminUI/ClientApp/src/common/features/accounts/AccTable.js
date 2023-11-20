import React, { useState } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';

import { Box, useDisclosure, useToast } from '@chakra-ui/react';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephone, BsFillShieldLockFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import TitleCard from '../../components/cards/TitleCard';
import DynamicTable from '../../components/tables/DynamicTable';
import DynamicDrawer from '../../components/tables/DynamicDrawer';
import LoadingSpinner from '../../components/LoadingSpinner';
import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';

import { accountService, useGetListAccount } from '../../../modules/services/AccountService';

import { passwordRegex } from '../../../helper/validations/ValidationRegExp';
import { ACCOUNT_MANAGEMENT } from '../../../helper/constants/DummyData';
import AccTopSideButtons from './AccTopSideButtons';

function AccTable() {
	//* #region declare variables
	const toast = useToast();

	const queryClient = useQueryClient();
	const [editData, setEditData] = useState({});
	const [deleteSingleData, setDeleteSingleData] = useState({});
	const [switchStatusData, setSwitchStatusData] = useState({});
	const [account, setAccounts] = useState(ACCOUNT_MANAGEMENT);
	//* #endregion

	//* #region hooks
	const {
		// data: listAccountData,
		isFetching: isFetchingListAccount,
		isLoading: isLoadingListAccount
	} = useGetListAccount();
	const { isOpen: isDeleteSingleOpen, onOpen: onDeleteSingleOpen, onClose: onDeleteSingleClose } = useDisclosure();
	const { isOpen: isAddEditOpen, onOpen: onAddEditOpen, onClose: onAddEditClose } = useDisclosure();
	const { isOpen: isSwitchStatusOpen, onOpen: onSwitchStatusOpen, onClose: onSwitchStatusClose } = useDisclosure();

	const useCreateAccount = useMutation(accountService.createAccount, {
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
				title: error.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});
	const useDeleteAccount = useMutation(accountService.deleteAccount, {
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
				title: error.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});
	const useSaveAccount = useMutation(accountService.saveAccount, {
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
				title: error.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});
	const useUpdateAccountStatus = useMutation(accountService.updateAccountStatus, {
		onSuccess: (res) => {
			const { message, data } = res;
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
					title: `${data.companyName} ${data.active ? 'is now Disabled' : 'is now Active'}`,
					position: 'bottom-right',
					status: 'success',
					isClosable: true,
					duration: 5000
				});
			}
		},
		onError: (error) => {
			toast({
				title: error.message,
				position: 'bottom-right',
				status: 'error',
				isClosable: true,
				duration: 5000
			});
		}
	});
	//* #endregion

	//* #region functions
	const handleEditAccount = (values) => {
		const id = editData.id;
		const employeeObj = {
			...values,
			dateOfBirth: values?.dateOfBirth ? new Date(values?.dateOfBirth).toISOString() : null
		};
		useSaveAccount.mutate({ id, employeeObj });
		closeDrawer();
	};
	const handleCreateAccount = (values) => {
		const employeeObj = {
			...values,
			dateOfBirth: values?.dateOfBirth ? new Date(values?.dateOfBirth).toISOString() : null
		};
		useCreateAccount.mutate(employeeObj);
		closeDrawer();
	};
	const editAccount = (row, action) => {
		onAddEditOpen();
		setEditData(row);
	};
	const closeDrawer = () => {
		onAddEditClose();
		setEditData({});
	};

	const deleteAccount = (row, action) => {
		setDeleteSingleData(row);
		onDeleteSingleOpen();
	};
	const handleAcceptDelete = () => {
		console.log(deleteSingleData);
		useDeleteAccount.mutate(deleteSingleData.id);
		setDeleteSingleData({});
		onDeleteSingleClose();
	};

	const switchStatusAccount = (row, action) => {
		setSwitchStatusData(row);
		console.log(switchStatusData);
		onSwitchStatusOpen();
	};
	const handleSwitchStatus = () => {
		console.log(switchStatusData);
		useUpdateAccountStatus.mutate(switchStatusData.companyId);
		setSwitchStatusData({});
		onSwitchStatusClose();
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
	//* #endregion

	//* #region table
	const tableRowAction = [
		{
			actionName: 'Edit',
			func: editAccount,
			isDisabled: true
		},
		{
			actionName: 'Delete',
			func: deleteAccount,
			isDisabled: true
		}
	];
	const columns = React.useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'companyId',
				hidden: true
			},
			{
				Header: 'Name',
				accessor: 'companyName',
				cellWidth: '140px'
			},
			{
				Header: 'Email',
				accessor: 'email',
				cellWidth: '140px'
			},
			{
				Header: 'Address',
				accessor: 'address',
				cellWidth: '220px'
			},
			{
				Header: 'Phone Number',
				accessor: 'phoneNumber',
				cellWidth: '150px'
			},
			{
				Header: 'Active',
				accessor: 'active',
				cellWidth: '50px'
			}
		],
		[]
	);
	//* #endregion

	//* #region drawer
	const baseFieldData = [
		{
			name: 'companyName',
			label: 'Company Name',
			placeholder: 'Company Name',
			isRequired: true,
			leftIcon: <FaRegUserCircle color="#999" fontSize="1rem" />
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Email address',
			isRequired: true,
			isReadOnly: Object.keys(editData).length === 0 ? false : true,
			leftIcon: <MdOutlineAlternateEmail color="#999" fontSize="1rem" />
		},
		{
			name: 'phoneNumber',
			label: 'Phone',
			type: 'type',
			placeholder: 'Phone Number',
			isRequired: true,
			leftIcon: <BsTelephone color="#999" fontSize="1rem" />
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

	const addFieldData = [
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Password',
			isRequired: true,
			isPassword: 'true',
			leftIcon: <BsFillShieldLockFill color="#999" fontSize="1rem" />,
			rightIcon: <BsEyeFill color="#999" fontSize="1rem" />,
			hideIcon: <BsEyeSlashFill color="#999" fontSize="1rem" />
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
			placeholder: 'Confirm Password',
			isPassword: 'true',
			isRequired: true,
			leftIcon: <BsFillShieldLockFill color="#999" fontSize="1rem" />,
			rightIcon: <BsEyeFill color="#999" fontSize="1rem" />,
			hideIcon: <BsEyeSlashFill color="#999" fontSize="1rem" />
		}
	];

	const drawerAddFieldData = [...baseFieldData, ...addFieldData];
	const drawerEditFieldData = [...baseFieldData];
	const initialValues = {
		companyName: `${editData?.companyName ?? ''}`,
		email: `${editData?.email ?? ''}`,
		address: `${editData?.address ?? ''}`,
		phoneNumber: `${editData?.phoneNumber ?? ''}`,
		active: `${editData?.active ?? false}`
	};
	const validationSchema = Yup.object().shape({
		companyName: Yup.string().required('This field is required'),
		email: Yup.string().required('This field is required'),
		address: Yup.string().required('This field is required'),
		phoneNumber: Yup.string().required('This field is required'),
		password: Yup.string().matches(passwordRegex, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 8 characters long').required('This field is required')
	});
	//* #endregion

	if (isFetchingListAccount) return <LoadingSpinner />;
	return (
		<TitleCard title="Accounts Management" topMargin="mt-3" TopSideButtons={<AccTopSideButtons applySearch={applySearch} removeFilter={removeFilter} onAddEditOpen={onAddEditOpen} />}>
			{useCreateAccount.isLoading || useSaveAccount.isLoading || useDeleteAccount.isLoading || isLoadingListAccount ? (
				<LoadingSpinner />
			) : (
				<Box marginTop="0px !important">
					{
						// listAccountData?.result?.data
						account && (
							<DynamicTable
								handleSwitchStatus={switchStatusAccount}
								tableRowAction={tableRowAction}
								columns={columns}
								data={
									//listAccountData?.result?.data
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
						drawerFieldData={Object.keys(editData).length === 0 ? drawerAddFieldData : drawerEditFieldData}
					/>
					<ChakraAlertDialog title="Delete Single" isOpen={isDeleteSingleOpen} onClose={onDeleteSingleClose} onAccept={handleAcceptDelete} />
					<ChakraAlertDialog
						isOpen={isSwitchStatusOpen}
						onClose={onSwitchStatusClose}
						onAccept={handleSwitchStatus}
						acceptButtonColor="green"
						acceptButtonLabel={`Confirm`}
						message={`Are you sure you want to ${switchStatusData?.active === true ? 'disable' : 'enable'} this account?`}
						title={`${switchStatusData?.active === true ? 'Disable' : 'Enable'} this account`}
					/>
				</Box>
			)}
		</TitleCard>
	);
}

export default AccTable;
