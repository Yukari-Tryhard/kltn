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

			{/* Filter button */}
			{filterParam !== '' && (
				<button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">
					{filterParam}
					<XMarkIcon className="w-4 ml-2" />
				</button>
			)}
			<div className="dropdown dropdown-bottom dropdown-end">
				<label tabIndex={0} className="btn btn-sm btn-outline">
					<FunnelIcon className="w-5 mr-2" />
					Filter
				</label>
				<ul tabIndex={1} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
					{locationFilters.map((l, k) => {
						return (
							<li key={k}>
								<button onClick={() => showFiltersAndApply(l)}>{l}</button>
							</li>
						);
					})}
					<div className="divider mt-0 mb-0"></div>
					<li>
						<button onClick={() => removeAppliedFilter()}>Remove Filter</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AccTopSideButtons;
