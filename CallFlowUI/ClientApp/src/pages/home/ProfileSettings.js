import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/common/HeaderSlice';
import ProfileSettings from '../../common/features/settings/ProfileSettings';

function InternalPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: 'Settings' }));
	}, [dispatch]);

	return <ProfileSettings />;
}

export default InternalPage;
