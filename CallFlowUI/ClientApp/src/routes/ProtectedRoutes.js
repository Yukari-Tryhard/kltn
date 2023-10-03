import { lazy } from 'react';

const Welcome = lazy(() => import('./../pages/home/Welcome'));
const ProfileSettings = lazy(() => import('./../pages/home/ProfileSettings'));

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
