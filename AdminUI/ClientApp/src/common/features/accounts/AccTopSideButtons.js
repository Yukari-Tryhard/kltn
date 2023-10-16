import { useEffect, useState, useCallback } from 'react';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import SearchBar from '../../components/field/SearchBar';

const AccTopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
	const [filterParam, setFilterParam] = useState('');
	const [searchText, setSearchText] = useState('');
	const locationFilters = ['Paris', 'London', 'Canada', 'Peru', 'Tokyo'];

	const showFiltersAndApply = (params) => {
		applyFilter(params);
		setFilterParam(params);
	};

	const removeAppliedFilter = useCallback(() => {
		removeFilter();
		setFilterParam('');
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
		<div className="inline-block float-right">
			{/* Searchbar */}
			<SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />

			{/* Add new button */}
			

			
		</div>
	);
};

export default AccTopSideButtons;
