import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NoRoute from "@/pages/NoRoute";

export const nav = [
  {
    path: "/home",
    name: "Home",
    element: <Home />,
    isPrivate: true,
    isFree: false,
  },
  {
    path: "*",
    name: "NotFound",
    element: <NoRoute />,
    isPrivate: true,
    isFree: true,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isPrivate: false,
    isPaid: true,
    isFree: true,
  },
];
