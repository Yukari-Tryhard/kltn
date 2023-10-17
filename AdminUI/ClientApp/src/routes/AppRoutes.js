import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing pages
const Auth = lazy(() => import('./../pages/auth/Auth'));
const Layout = lazy(() => import('./../containers/Layout'));
const Login = lazy(() => import('../pages/auth/SignIn'));
const Register = lazy(() => import('./../pages/auth/SignUp'));
const FirstTimeLogin = lazy(() => import('./../pages/auth/FirstTimeLogin'));
const NotFound = lazy(() => import('./../pages/error/NotFound'));

// Importing routes
const ProtectedFirstTimeLoginRoute = lazy(() => import('./../routes/ProtectedFirstTimeLoginRoute'));

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

			<Route element={<ProtectedFirstTimeLoginRoute />}>
				<Route path="first-time-login" element={<FirstTimeLogin />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
