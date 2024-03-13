import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../store";

const AuthWrapper = () => {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default AuthWrapper;
