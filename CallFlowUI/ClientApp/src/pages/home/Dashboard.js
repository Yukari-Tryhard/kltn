import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/common/HeaderSlice';
import Dashboard from '../../features/dashboard/index';

function InternalPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: 'Dashboard' }));
	}, [dispatch]);

	return <Dashboard />;
}

export default InternalPage;
