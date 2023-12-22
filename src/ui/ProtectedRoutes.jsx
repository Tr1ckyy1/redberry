import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  // We only need isAuthenticated which is coming from "user" cache, before we even log in to the page.
  const { isLoggedIn, isLoading } = useAuthentication();

  //   // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/");
  }, [isLoggedIn, navigate, isLoading]);

  if (isLoggedIn) return children;
}

export default ProtectedRoutes;

//   // 2. If there is NO authenticated user, redirect to the /login
//   useEffect(() => {
//     if (!isAuthenticated && !isLoading) navigate("/login");
//   }, [isAuthenticated, isLoading, navigate]);

//   // 3. While loading, show a spinner
//   if (isLoading)
//     return (
//       <FullPage>
//         <Spinner />
//       </FullPage>
//     );
