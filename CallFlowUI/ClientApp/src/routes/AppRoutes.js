import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Importing pages
const Layout = lazy(() => import('./../containers/Layout'));
const Login = lazy(() => import('../pages/auth/SignIn'));
const Register = lazy(() => import('./../pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('./../pages/resetpassword/ResetPasswordPage'));

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/register" element={<Register />} />

			{/* Place new routes over this */}
			<Route path="/app/*" element={<Layout />} />

			<Route path="*" element={<Navigate to={'/app/welcome'} replace />} />
		</Routes>
	);
};

export default AppRoutes;
