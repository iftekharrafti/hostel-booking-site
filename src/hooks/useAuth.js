// hooks/useAuth.js
import { useEffect } from 'react';
import Cookies from "js-cookie";

const useAuth = () => {
    const cookieValue = Cookies.get("TOKEN_LOGIN");


  useEffect(() => {
    if (cookieValue) {
      // Redirect the user to a different page (e.g., the dashboard)
      window.location.href = '/dashboard';
    }
  }, [cookieValue]);

  return cookieValue;
};

export default useAuth;
