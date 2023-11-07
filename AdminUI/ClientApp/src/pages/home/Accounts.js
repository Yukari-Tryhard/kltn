import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from '../../modules/store/common/HeaderSlice';
import AccTable from '../../common/features/accounts/AccTable';

function InternalPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: 'Accounts' }));
	}, [dispatch]);

	return <AccTable />;
}

export default InternalPage;
