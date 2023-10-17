import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing pages
const Layout = lazy(() => import('./../containers/Layout'));
const Login = lazy(() => import('../pages/auth/SignIn'));
const Register = lazy(() => import('./../pages/auth/SignUp'));
const FirstTimeLogin = lazy(() => import('./../pages/auth/FirstTimeLogin'));
const NotFound = lazy(() => import('./../pages/error/NotFound'));

// Importing routes
const AuthRoute = lazy(() => import('./AuthRoute'));
const ErrorRoute = lazy(() => import('./ErrorRoute'));
const ProtectedFirstTimeLoginRoute = lazy(() => import('./../routes/ProtectedFirstTimeLoginRoute'));

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthRoute />}>
				<Route path="/" element={<Login />} />
				<Route path="sign-in" element={<Login />} />
				<Route path="sign-up" element={<Register />} />
			</Route>

			{/* Place new routes over this */}
			<Route element={<ProtectedFirstTimeLoginRoute />}>
				<Route path="first-time-login" element={<FirstTimeLogin />} />
			</Route>

			<Route path="/app/*" element={<Layout />} />

			<Route element={<ErrorRoute />}>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
