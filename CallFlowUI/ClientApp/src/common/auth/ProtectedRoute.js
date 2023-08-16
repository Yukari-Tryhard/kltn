import { Navigate, Outlet, useLocation    } from "react-router-dom";
import { AuthClient } from "../../api/web-api-client.ts";
import { BACKEND_URL } from "../../env";

const ProtectedRoute = () => {
    const location = useLocation();

    // Get current path
    const path = location.pathname;
    const isAccessTokenExist = localStorage.getItem("AccessToken") != null;
    console.log(path);
    if (isAccessTokenExist){
        const accessToken = localStorage.getItem("AccessToken");
        const expiresAt = new Date(accessToken.split('.')[1]);

        if (new Date() > expiresAt) {
            return <Navigate to={"/signin"} replace></Navigate>;
        } else {
            if (path == "/signin" || path == "/signup"){
                return <Navigate to={"/home/usage"} replace></Navigate>;
            }
            return <Outlet></Outlet>;
        }
    }
    return <Outlet></Outlet>
  };

export default ProtectedRoute;