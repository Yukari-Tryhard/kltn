import { useEffect, useState, useCallback } from 'react';
import { Button, Tooltip, Flex, Stack } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import SearchBar from '../../components/field/SearchBar';

const AccTopSideButtons = ({ removeFilter, applySearch, onAddEditOpen }) => {
	const [searchText, setSearchText] = useState('');

	const removeAppliedFilter = useCallback(() => {
		removeFilter();
		setSearchText('');
	}, [removeFilter]);

	useEffect(() => {
		if (searchText === '') {
			removeAppliedFilter();
		} else {
			applySearch(searchText);
		}
	}, [applySearch, removeAppliedFilter, searchText]);

	return (
		<Flex align="center">
			<Stack direction="row" spacing={4}>
				{/* Searchbar */}
				<SearchBar searchText={searchText} setSearchText={setSearchText} />

				{/* AccTopSideButtons */}
				<Tooltip label="Add new record for table" hasArrow>
					<Button leftIcon={<IoIosAddCircleOutline size={18} className="mt-0.5" />} shadow="2xl" colorScheme="green" fontSize="xs" w="110px" onClick={onAddEditOpen}>
						Add New
					</Button>
				</Tooltip>
			</Stack>
		</Flex>
	);
};

export default AccTopSideButtons;
