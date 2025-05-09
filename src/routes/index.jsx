import { Navigate } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { shopRoutes } from "./shopRoutes";
import UnauthPage from "@/pages/unauth-page";
import NotFound from "@/pages/not-found";

export const appRoutes = [
  { path: "/", element: <Navigate to="/shop/home" /> },
  authRoutes,
  adminRoutes,
  shopRoutes,
  { path: "/unauth-page", element: <UnauthPage /> },
  { path: "*", element: <NotFound /> },
];
