import { lazy } from 'react';

const ProfileSettings = lazy(() => import('./../pages/home/ProfileSettings'));
const Accounts = lazy(() => import('./../pages/home/Accounts'));
const Dashboard = lazy(() => import('./../pages/home/Dashboard'));
const Settings = lazy(() => import('./../pages/home/Settings'));

const routes = [
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
	},
	{
		path: '/settings',
		component: Settings
	}
];

export default routes;
