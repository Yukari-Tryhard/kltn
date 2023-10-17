import { Outlet } from 'react-router-dom';
import { Helper } from '../helper/Helper';
import UnAuthorize from '../pages/error/UnAuthorize';

const ProtectedFirstTimeLoginRoute = () => {
	return !Helper.isFirstTimeLogin() ? <Outlet /> : <UnAuthorize />;
};

export default ProtectedFirstTimeLoginRoute;
