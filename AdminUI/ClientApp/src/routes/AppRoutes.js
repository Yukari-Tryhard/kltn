import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing pages
const Login = lazy(() => import('../pages/auth/SignIn'));
const Register = lazy(() => import('./../pages/auth/SignUp'));
const FirstTimeLogin = lazy(() => import('./../pages/auth/FirstTimeLogin'));
const NotFound = lazy(() => import('./../pages/error/NotFound'));

// Importing routes
const ProtectedLayout = lazy(() => import('./../containers/ProtectedLayout'));
const AuthLayout = lazy(() => import('../containers/AuthLayout'));
const ErrorLayout = lazy(() => import('../containers/ErrorLayout'));
const FirstLoginLayout = lazy(() => import('../containers/FirstLoginLayout'));

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="/" element={<Login />} />
				<Route path="sign-in" element={<Login />} />
				<Route path="sign-up" element={<Register />} />
			</Route>

			{/* Place new routes over this */}
			<Route element={<FirstLoginLayout />}>
				<Route path="first-time-login" element={<FirstTimeLogin />} />
			</Route>

			<Route path="/app/*" element={<ProtectedLayout />} />

			<Route element={<ErrorLayout />}>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
