import AuthLayout from "@/components/auth/layout";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import CheckAuth from "@/components/common/check-auth";

export const authRoutes = {
  path: "/auth",
  element: (
    <CheckAuth>
      <AuthLayout />
    </CheckAuth>
  ),
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};
