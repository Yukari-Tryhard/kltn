import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

// Decoration
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {
	Table,
	Tbody,
	Tr,
	Th,
	Td,
	Thead,
	TableContainer,
	Switch,
	Box,
	Icon,
	Button,
	Text,
	HStack,
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
	Stack,
	Flex,
	Input,
	Select,
	// useDisclosure,
	Tooltip,
	Portal
} from '@chakra-ui/react';
// Icons
import { FiMoreVertical } from 'react-icons/fi';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { AiFillFilter } from 'react-icons/ai';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// Components
import { Helper } from '../../../helper/Helper';
import NoDataToDisplay from '../NoDataToDisplay';
// import ChakraAlertDialog from '../../components/dialog/ChakraAlertDialog';
// import IndeterminateCheckbox from '../IndeterminateCheckbox';

// Global variables
const numberType = ['Is Greater Than Or Equal To', 'Is Greater Than', 'Is Less Than Or Equal To', 'Is Less Than', 'Is Equal To', 'Is Not Equal To'];
const textType = ['Start With', 'End With'];
const dateTimeType = ['Is Before Or Equal To', 'Is Before', 'Is After Or Equal To', 'Is After'];
const defaultType = ['Contains', 'Does Not Contains', 'Is Empty', 'Is Not Empty'];

export const FilterType = {
	Number: {
		type: 'number',
		array: numberType
	},
	Text: {
		type: 'text',
		array: textType
	},
	DateTime: {
		type: 'dateTime',
		array: dateTimeType
	},
	Default: {
		type: 'text',
		array: defaultType
	}
};

function DynamicTable(props) {
	const {
		data,
		columns,
		// handleDeleteRange,
		onAddEditOpen,
		tableRowAction,
		// hideAction,
		hideButtons,
		noPaging
	} = props;
	// const { isOpen: isDeleteRangeOpen, onOpen: onDeleteRangeOpen, onClose: onDeleteRangeClose } = useDisclosure();

	// const handleDeleteRangeAlertAccept = () => {
	// 	onDeleteRangeClose();
	// 	handleDeleteRange(selectedFlatRows);
	// };

	const {
		headerGroups,
		rows,
		page,
		//selectedFlatRows,
		nextPage,
		previousPage,
		gotoPage,
		canNextPage,
		canPreviousPage,
		pageCount,
		setPageSize,
		state: { pageIndex, pageSize },
		getTableProps,
		getTableBodyProps,
		prepareRow
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 5 }
		},
		(hooks) => {
			hooks?.visibleColumns?.push((columns) => [
				{
					id: 'action',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Flex gap="5px">
							<Text color="white" fontWeight="600" fontSize="1.1rem">
								Action
							</Text>
						</Flex>
					),
					Cell: ({ row }) => (
						<HStack>
							{/* {<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} type="checkbox" />} */}
							<Box>
								<Menu isLazy>
									<Tooltip placement="right" label="Record Bulk Action" hasArrow>
										<MenuButton colorScheme="blue" variant="outline" as={Button}>
											<Icon as={FiMoreVertical} />
										</MenuButton>
									</Tooltip>
									<Portal>
										<MenuList>
											{tableRowAction.map((item) => {
												return (
													<MenuItem
														isDisabled={!item?.isDisabled}
														key={item.actionName}
														onClick={() => {
															item.func(row?.values, item.actionName);
														}}
													>
														{item.actionName}
													</MenuItem>
												);
											})}
										</MenuList>
									</Portal>
								</Menu>
							</Box>
						</HStack>
					)
				},
				...columns
			]);
		},
		useSortBy,
		usePagination,
		useRowSelect
	);

	const initialData = columns.reduce((col, curr) => {
		const { accessor, haveFilter } = curr;
		if (!haveFilter) return { ...col };
		const filterType = haveFilter?.filterType.type || 'default';
		const initialValue = filterType === 'number' ? -1 : '';
		return {
			...col,
			[accessor]: {
				value: initialValue,
				sorterType: '',
				filterType: haveFilter?.filterType.array[0]
			}
		};
	}, {});

	const [pagingObject, setPagingObject] = useState({
		paging: {
			pageSize: pageSize,
			pageNumber: pageIndex + 1,
			totalElements: 999
		},
		filterAndSorter: initialData
	});

	const handleFilter = (sortAndFilterValue, accessor, value) => {
		if (Object.is(pagingObject.filterAndSorter[accessor].filterType, sortAndFilterValue)) {
			return;
		}
		setPagingObject((prev) => {
			const updatedFilterAndSorter = { ...prev.filterAndSorter };
			// updatedFilterAndSorter[accessor].value=value
			updatedFilterAndSorter[accessor].filterType = sortAndFilterValue;
			return { ...prev, filterAndSorter: updatedFilterAndSorter };
		});
	};

	const debouncedGotoPage = debounce((value) => {
		const pageNumber = value && Number(value) && value > 0 ? value - 1 : 0;
		gotoPage(pageNumber);
		// setPagingObject((prev) => {
		//   const updatedFilterAndSorter = { ...prev.paging };
		//   updatedFilterAndSorter.pageNumber = pageNumber;
		//   return { ...prev, paging: updatedFilterAndSorter };
		// });
	}, 500);

	const handleSort = (column, value) => {
		setPagingObject((prev) => {
			let updatedFilterAndSorter = { ...prev.filterAndSorter };
			// updatedFilterAndSorter[accessor].value=value
			column.toggleSortBy();
			for (let key in updatedFilterAndSorter) {
				if (updatedFilterAndSorter[key].sorterType !== '') {
					updatedFilterAndSorter[key].sorterType = '';
				}
			}
			updatedFilterAndSorter[column.id].sorterType = value;
			return { ...prev, filterAndSorter: updatedFilterAndSorter };
		});
	};

	const handleOnBlurInputHeaderField = (column, value) => {
		if (Object.is(pagingObject.filterAndSorter[column.id].value, value)) {
			return;
		}
		setPagingObject((prev) => {
			let updatedFilterAndSorter = { ...prev.filterAndSorter };
			updatedFilterAndSorter[column.id].value = value;
			return { ...prev, filterAndSorter: updatedFilterAndSorter };
		});
	};

	// const handleReset = () => {
	// 	setPagingObject({
	// 		paging: {
	// 			pageSize: pageSize,
	// 			pageNumber: pageIndex + 1
	// 		},
	// 		filterAndSorter: initialData
	// 	});
	// 	setPageSize(pageSize);
	// 	gotoPage(0);
	// };

	useEffect(() => {
		setPagingObject((prev) => {
			let updatedFilterAndSorter = { ...prev.paging };
			updatedFilterAndSorter.pageNumber = pageIndex;
			return { ...prev, paging: updatedFilterAndSorter };
		});
	}, [pageIndex]);
	useEffect(() => {
		setPagingObject((prev) => {
			let updatedFilterAndSorter = { ...prev.paging };
			updatedFilterAndSorter.pageSize = pageSize;
			return { ...prev, paging: updatedFilterAndSorter };
		});
	}, [pageSize]);
	useEffect(() => {}, [pagingObject]);

	return (
		<Stack marginTop="0px !important">
			<>
				{/* Toolbar */}
				<HStack
					display="flex"
					width="100%"
					className="tool-bar"
					flexDirection={{
						base: 'column',
						xl: 'row'
					}}
					gap="10px"
					alignItems="flex-start"
				>
					{!hideButtons && (
						<HStack flex="1">
							{
								<Tooltip placement="top" hasArrow label="Add new record for table">
									<Button shadow="2xl" colorScheme="green" onClick={onAddEditOpen}>
										Add New
									</Button>
								</Tooltip>
							}
							{/* <Tooltip placement="top" hasArrow label="Reset table paging">
								<Button shadow="2xl" colorScheme="green" onClick={handleReset}>
									Reset
								</Button>
							</Tooltip> */}
							{/* {
								<Tooltip placement="top" hasArrow label="Delete a collection of record">
									<Button onClick={onDeleteRangeOpen} isDisabled={selectedFlatRows.length < 2} colorScheme="blue">
										Delete Range
									</Button>
								</Tooltip>
							} */}
							{/* <ChakraAlertDialog
								isOpen={isDeleteRangeOpen}
								onClose={onDeleteRangeClose}
								onAccept={handleDeleteRangeAlertAccept}
								title={`Delete ${rows.length === selectedFlatRows.length ? 'All' : ''} ${selectedFlatRows.length} items`}
							/> */}
						</HStack>
					)}
					{!noPaging && (
						<HStack
							spacing="10px"
							display="flex"
							gap="10px"
							flex="1"
							marginLeft="0px !important"
							alignItems="center"
							flexDirection={{
								base: 'column',
								md: 'row'
							}}
							justifyContent={{
								base: 'flex-start',
								md: 'flex-end'
							}}
						>
							<HStack>
								<Button colorScheme="green" onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} shadow="2xl">
									<Icon as={MdSkipPrevious} />
								</Button>
								<Button colorScheme="green" onClick={() => previousPage()} isDisabled={!canPreviousPage} shadow="2xl">
									Previous
								</Button>
								<Button colorScheme="green" onClick={() => nextPage()} isDisabled={!canNextPage} shadow="2xl">
									Next
								</Button>
								<Button colorScheme="green" onClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} shadow="2xl">
									<Icon as={MdSkipNext} />
								</Button>
							</HStack>
							<HStack>
								<Flex alignItems="center">
									<Text fontWeight="semibold" fontSize="sm">
										{pageIndex + 1}/{pageCount} {pageCount > 1 ? 'pages' : 'page'}
									</Text>
								</Flex>
								<Flex alignItems="center" gap="5px">
									<Text fontWeight="semibold" fontSize="sm">
										Go to
									</Text>
									<Tooltip placement="top" hasArrow label="Jump to specific page">
										<Input
											type="number"
											flex="1"
											background="white"
											width="70px"
											onChange={(e) => {
												debouncedGotoPage(e.target.value);
											}}
											defaultValue={pageIndex + 1}
											min={1}
											shadow="2xl"
										/>
									</Tooltip>
								</Flex>
								<Tooltip placement="top" hasArrow label="Number of showing items">
									<Select
										shadow="2xl"
										width="150px"
										value={pageSize}
										background="white"
										fontSize={{ base: 'sm', md: 'md' }}
										onChange={(e) => {
											setPageSize(Number(e.target.value));
										}}
									>
										{[10, 20, 30].map((pageSize) => (
											<option key={pageSize} value={pageSize}>
												Show {pageSize}
											</option>
										))}
										<option key={data.length} value={data.length}>
											Show All
										</option>
									</Select>
								</Tooltip>
							</HStack>
						</HStack>
					)}
				</HStack>

				{/* Table */}
				<TableContainer rounded="lg" shadow="2xl" marginTop="12px">
					<Table variant="simple" {...getTableProps()}>
						<Thead bgColor="primary2">
							{headerGroups?.map((headerGroup) => (
								<Tr {...headerGroup?.getHeaderGroupProps()}>
									{headerGroup?.headers?.map((column, index) => {
										if (index !== 0) {
											return (
												<Th textTransform="capitalize" fontSize="sm" color="white" {...column?.getHeaderProps()} display={column?.hidden ? 'none' : 'undefine'} bg="#1C6758">
													<Flex alignItems="center" gap="5px">
														{column?.haveFilter && (
															<Menu>
																<MenuButton>
																	<Icon color="white" boxSize="20px" as={AiFillFilter} />
																</MenuButton>
																<MenuList color="black">
																	{column?.haveFilter?.filterType?.array.map((selectValue, index) => (
																		<MenuItem
																			key={index}
																			background={pagingObject?.filterAndSorter[column?.id].filterType === selectValue ? 'antiquewhite' : 'none'}
																			onClick={() => handleFilter(selectValue, column?.id, null)}
																		>
																			{selectValue}
																		</MenuItem>
																	))}
																</MenuList>
															</Menu>
														)}
														{column?.haveSort && column?.haveFilter ? (
															column?.haveFilter?.filterType?.type === 'dateTime' ? (
																<Input
																	_placeholder={{
																		color: 'white',
																		fontWeight: 'normal',
																		fontSize: '1.2rem'
																	}}
																	variant="flushed"
																	type="date"
																	onChange={(e) => {
																		handleOnBlurInputHeaderField(column, e.target.value);
																	}}
																	placeholder={column?.render('Header')}
																/>
															) : (
																<Input
																	_placeholder={{
																		color: 'white',
																		fontWeight: 'normal',
																		fontSize: '1.2rem'
																	}}
																	variant="flushed"
																	onBlur={(e) => {
																		handleOnBlurInputHeaderField(column, e.target.value);
																	}}
																	placeholder={column?.render('Header')}
																/>
															)
														) : (
															<Text color="white" fontWeight="600" fontSize="1.1rem">
																{column?.Header}
															</Text>
														)}
														{column?.haveSort && (
															<Flex color="white" cursor="pointer" flexDirection="column">
																{column?.isSorted ? (
																	column?.isSortedDesc ? (
																		<Icon
																			onClick={(e) => {
																				column?.getSortByToggleProps();
																				handleSort(column, '');
																			}}
																			boxSize="20px"
																			as={FaSortDown}
																		/>
																	) : (
																		<Icon
																			onClick={(e) => {
																				column?.getSortByToggleProps();
																				handleSort(column, 'des');
																			}}
																			boxSize="20px"
																			as={FaSortUp}
																		/>
																	)
																) : (
																	<Icon
																		onClick={(e) => {
																			column?.getSortByToggleProps();
																			handleSort(column, 'asc');
																		}}
																		boxSize="20px"
																		as={FaSort}
																	/>
																)}
															</Flex>
														)}
													</Flex>
												</Th>
											);
										}
										return (
											<Th textTransform="capitalize" fontSize="md" bg="#1C6758" {...column?.getHeaderProps()}>
												{column?.render('Header')}
											</Th>
										);
									})}
								</Tr>
							))}
						</Thead>
						<Tbody width="100%" bgColor="white" {...getTableBodyProps()}>
							{rows?.length > 0 &&
								page?.map((row, index) => {
									prepareRow(row);
									return (
										<Tr bg={!Helper.isOdd(index) ? '#e1e8ef' : 'none'} {...row?.getRowProps()}>
											{row?.cells?.map((cell) => {
												return (
													<Td {...cell?.getCellProps()} display={cell?.column?.hidden ? 'none' : 'undefine'}>
														{cell?.column?.dataType === 'dateTime' && cell?.value instanceof Date ? (
															<Box width={cell?.column?.cellWidth ? cell?.column?.cellWidth : 'none'} textAlign={cell?.column?.textAlign ? cell?.column?.textAlign : 'none'} textOverflow="ellipsis" overflow="hidden">
																<Text fontSize="1rem" fontWeight="normal">
																	{Helper.getMomentDateFormat(cell?.value)}
																</Text>
															</Box>
														) : typeof cell?.value === 'boolean' ? (
															<Box
																width={cell?.column?.cellWidth ? cell?.column?.cellWidth : 'none'}
																textAlign={cell?.column?.textAlign ? cell?.column?.textAlign : 'none'}
																textOverflow="ellipsis"
																overflow="hidden"
																fontSize="1rem"
																fontWeight="normal"
															>
																<Switch id="isChecked" isChecked={cell?.value} colorScheme="teal" size="lg" />
															</Box>
														) : (
															<Box
																width={cell?.column?.cellWidth ? cell?.column?.cellWidth : 'none'}
																textAlign={cell?.column?.textAlign ? cell?.column?.textAlign : 'none'}
																textOverflow="ellipsis"
																overflow="hidden"
																fontSize="1rem"
																fontWeight="normal"
															>
																{cell?.render('Cell')}
															</Box>
														)}
													</Td>
												);
											})}
										</Tr>
									);
								})}
							{rows?.length === 0 && <NoDataToDisplay />}
						</Tbody>
					</Table>
				</TableContainer>
			</>
		</Stack>
	);
}

export default DynamicTable;
