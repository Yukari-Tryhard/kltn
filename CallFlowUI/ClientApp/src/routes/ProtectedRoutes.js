import { lazy } from 'react';

const Welcome = lazy(() => import('./../pages/protected/Welcome'));
const ProfileSettings = lazy(() => import('./../pages/protected/ProfileSettings'));

const routes = [
	{
		path: '/welcome', // the url
		component: Welcome // view rendered
	},
	{
		path: '/settings-profile',
		component: ProfileSettings
	}
];

export default routes;
