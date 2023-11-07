import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from '../../modules/store/common/HeaderSlice';
import ProfileSettings from '../../common/features/settings/ProfileSettings';

function InternalPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: 'Profile Details' }));
	}, [dispatch]);

	return <ProfileSettings />;
}

export default InternalPage;
