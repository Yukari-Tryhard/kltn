import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AvatarWithPreview from '../../components/AvatarWithPreview';
import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';

import { useGetPermission } from '../../../hook/useGetPermission';
import { passwordRegex } from '../../../helper/ValidationRegExp';
import { Helper } from '../../../helper/Helper';

import { RECENT_TRANSACTIONS } from '../../../helper/DummyData';
import AccTopSideButtons from './AccTopSideButtons';

function AccTable() {
	//* #region declare variables
	const toast = useToast();
	const queryClient = useQueryClient();
	const [editData, setEditData] = useState({});
	const [deleteSingleData, setDeleteSingleData] = useState({});
	//* #endregion

	//* #region hooks
	// const { data: dataListDepartment, isFetching: isFetchingListDepartment, isLoading: isLoadingListDepartment } = useGetListDepartment();
	const {
		data: dataListOrganization,
		isLoading: isLoadingListOrganization,
		isFetching: isFetchingListOrganization
	} = useQuery(
		'listOrganization',
		// organizationService.getListOrganization,
		{
			refetchOnWindowFocus: false,
			retry: 1
		}
	);
	const [listOrganizationArray, setListOrganizationArray] = useState([]);
	useEffect(() => {
		setListOrganizationArray(Helper.convertToArraySelection(dataListOrganization?.result, 'organizationName', 'organizationId'));
	}, [dataListOrganization]);

	const useCreateDepartment = useMutation(
		// departmentService.createDepartmentService,
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
					queryClient.invalidateQueries('listDepartment');
					toast({
						title: 'Create Department Successfully',
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
	const useDeleteDepartment = useMutation(
		// departmentService.deleteDepartment,
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
					queryClient.invalidateQueries('listDepartment');
					toast({
						title: 'Delete Department Successfully',
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
	const useSaveDepartment = useMutation(
		// departmentService.saveDepartmentService,
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
					queryClient.invalidateQueries('listDepartment');
					toast({
						title: 'Save Department Successfully',
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
	const Delete = (row, action) => {
		setDeleteSingleData(row.departmentId);
		onDeleteSingleOpen();
	};
	const handleAcceptDelete = () => {
		// console.log(deleteSingleData);
		useDeleteDepartment.mutate(deleteSingleData);
		setDeleteSingleData({});
		onDeleteSingleClose();
	};
	const Edit = (row, action) => {
		onAddEditOpen();
		setEditData(row);
	};
	const convertDepartmentObject = (values) => {
		let departmentLocation = values['location'];
		let organizationId = values['organization'];
		departmentLocation['address'] = values['address'];
		delete values['address'];
		delete values['location'];
		const departmentObj = {
			...values,
			location: { ...departmentLocation },
			organization: { organizationId }
		};
		return departmentObj;
	};
	const handleCreateDepartment = (values) => {
		const departmentObj = convertDepartmentObject(values);
		useCreateDepartment.mutate(departmentObj);
		closeDrawer();
	};
	const handleEditDepartment = (values) => {
		const id = editData.departmentId;
		const departmentObj = convertDepartmentObject(values);
		useSaveDepartment.mutate({ id, departmentObj });
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
			actionName: 'Edit'
			// func: Edit,
			// isDisabled: resultPermission?.update
		},
		{
			actionName: 'Delete'
			// func: Delete,
			// isDisabled: resultPermission?.delete
		}
	];
	const columns = React.useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'departmentId',
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
				cellWidth: '150px',
				hidden: true
			},
			{
				Header: 'Dep.Name',
				accessor: 'departmentName',
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,

				cellWidth: '200px'
			},
			{
				Header: 'Org.Name',
				accessor: 'organization',
				// haveFilter: {
				//   filterType: FilterType.Default,
				// },
				// haveSort: true,
				Cell: ({ value }) => <span>{value?.organizationName}</span>,
				cellWidth: '200px'
			},
			{
				Header: 'City',
				accessor: 'location.city',
				cellWidth: '200px'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'State',
				accessor: 'location.state',
				Cell: ({ row, value }) => {
					return <span>{State?.getStateByCodeAndCountry(row.values['location.state'], row.values['location.country'])?.name}</span>;
				},
				cellWidth: '150px'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'Country',
				accessor: 'location.country',
				Cell: ({ row, value }) => {
					return <span>{Country?.getCountryByCode(row.values['location.country'])?.name}</span>;
				},
				cellWidth: '200px'
				// haveFilter: {
				//   filterType: FilterType.Text,
				// },
				// haveSort: true,
			},
			{
				Header: 'Address',
				accessor: 'location.address',
				cellWidth: '200px'
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
			name: 'departmentName',
			label: 'Department Name',
			placeholder: 'Enter your Department Name',
			leftIcon: <FaRegUserCircle color="#999" fontSize="1.5rem" />
		},
		{
			name: 'organization',
			label: 'Organization',
			placeholder: '---',
			isSelectionField: true,
			selectionArray: listOrganizationArray ? [...listOrganizationArray] : []
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
		departmentName: `${editData.departmentName ? editData.departmentName : ''}`,
		organization: `${editData?.organization?.organizationId ? editData?.organization?.organizationId : ''}`,
		location: {
			country: `${editData['location.country'] ?? ''}`,
			state: `${editData['location.state'] ?? ''}`,
			city: `${editData['location.city'] ?? ''}`
		},
		address: `${editData['location.address'] ? editData['location.address'] : ''}`
	};
	const validationSchema = Yup.object().shape({
		departmentName: Yup.string().required('This field is required'),
		organization: Yup.string().required('This field is required'),
		address: Yup.string().required('This field is required')
	});
	//* #endregion

	// if (isLoadingListDepartment || isLoadingListOrganization) return <LoadingSpinner />;
	return (
		<TitleCard title="Accounts Management" topMargin="mt-2" TopSideButtons={<AccTopSideButtons />}>
			{useCreateDepartment.isLoading || useSaveDepartment.isLoading ? (
				<LoadingSpinner />
			) : (
				<Box marginTop="0px !important">
					{
						// dataListDepartment?.result?.data &&
						<DynamicTable
							onAddEditOpen={onAddEditOpen}
							handleDeleteRange={DeleteRange}
							tableRowAction={tableRowAction}
							columns={columns}
							data={
								dataListDepartment?.result?.data
							}
						/>
					}
					<DynamicDrawer
						handleEdit={handleEditDepartment}
						handleCreate={handleCreateDepartment}
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
