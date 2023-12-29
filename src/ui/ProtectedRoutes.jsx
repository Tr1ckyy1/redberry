import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();


  const { isLoggedIn, isLoading } = useAuthentication();

  // If there is NO authenticated user, redirect to the main page
  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/");
  }, [isLoggedIn, navigate, isLoading]);

  if (isLoggedIn) return children;
}

export default ProtectedRoutes;

