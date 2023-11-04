import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar({ searchText, styleClass, placeholderText, setSearchText }) {
	const updateSearchInput = (value) => {
		setSearchText(value);
	};

	return (
		<div className={'inline-block ' + styleClass}>
			<div className="input-group relative flex flex-wrap items-stretch w-full">
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="gray.300" />
					</InputLeftElement>
					<Input type="search" value={searchText} placeholder={placeholderText || 'Search for ...'} onChange={(e) => updateSearchInput(e.target.value)} />
				</InputGroup>
			</div>
		</div>
	);
}

export default SearchBar;
