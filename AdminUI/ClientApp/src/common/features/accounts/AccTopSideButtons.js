import { useEffect, useState, useCallback } from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
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
		<div style={{ display: 'flex', alignItems: 'center' }}>
			{/* Searchbar */}
			<SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />

			{/* AccTopSideButtons */}
			<div className="inline-block float-right">
				<Tooltip placement="top" hasArrow label="Add new record for table">
					<Button leftIcon={<IoIosAddCircleOutline className="h-5 w-5 mt-0.5" />} shadow="2xl" colorScheme="green" fontSize="sm" width="120px" onClick={onAddEditOpen}>
						Add New
					</Button>
				</Tooltip>
			</div>
		</div>
	);
};

export default AccTopSideButtons;
