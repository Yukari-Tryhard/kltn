import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Importing pages
const Auth = lazy(() => import('./../pages/auth/Auth'));
const Layout = lazy(() => import('./../containers/Layout'));
const Login = lazy(() => import('../pages/auth/SignIn'));
const Register = lazy(() => import('./../pages/auth/SignUp'));

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Auth />}>
				<Route path="/" element={<Login />} />
				<Route path="sign-in" element={<Login />} />
				<Route path="sign-up" element={<Register />} />
			</Route>

			{/* Place new routes over this */}
			<Route path="/app/*" element={<Layout />} />

			<Route path="*" element={<Navigate to={'/app/dashboard'} replace />} />
		</Routes>
	);
};

export default AppRoutes;
