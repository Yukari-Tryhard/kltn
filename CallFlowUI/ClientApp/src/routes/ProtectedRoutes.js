import { lazy } from 'react';

const Welcome = lazy(() => import('./../pages/home/Welcome'));
const ProfileSettings = lazy(() => import('./../pages/home/ProfileSettings'));
const Accounts = lazy(() => import('./../pages/home/Accounts'));
const Dashboard = lazy(() => import('./../pages/home/Dashboard'));

const routes = [
	{
		path: '/welcome', // the url
		component: Welcome // view rendered
	},
	{
		path: '/dashboard',
		component: Dashboard
	},
	{
		path: '/settings-profile',
		component: ProfileSettings
	},
	{
		path: '/accounts',
		component: Accounts
	}
];

export default routes;
