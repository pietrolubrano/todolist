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
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
}