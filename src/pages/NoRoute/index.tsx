/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NoRoute() {
  const navigate = useNavigate();

  const isAuthenticated = false;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isAuthenticated]);

  return <></>;
}
