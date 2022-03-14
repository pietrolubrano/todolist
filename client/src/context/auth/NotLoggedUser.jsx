import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
    useLocation,
    Navigate,
} from "react-router-dom";

export default function NotLoggedUser({ children }) {
    const { currentUser } = useContext(AuthContext);
    let location = useLocation();
  
    if (currentUser) {
      return <Navigate to="/workspaces" state={{ from: location }} replace />;
    }
  
    return children;
}