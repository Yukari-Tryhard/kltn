import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/common/HeaderSlice';
import SystemSettings from '../../common/features/settings/systems/SystemSettings';

function InternalPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: 'Settings' }));
	}, [dispatch]);

	return <SystemSettings />;
}

export default InternalPage;
