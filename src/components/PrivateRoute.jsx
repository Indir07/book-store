import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [authUser] = useAuth();
  return authUser ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
