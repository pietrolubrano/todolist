import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
    useLocation,
    Navigate,
} from "react-router-dom";

export default function RequireAuth({ children }) {
    const { currentUser } = useContext(AuthContext);
    let location = useLocation();
  
    if (!currentUser) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
  
    return children;
}