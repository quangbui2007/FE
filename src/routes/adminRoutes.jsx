import AdminLayout from "@/components/admin-view/layout";
import AdminDashboard from "@/pages/admin-view/dashboard";
import AdminProducts from "@/pages/admin-view/products";
import AdminOrders from "@/pages/admin-view/orders";
import AdminFeatures from "@/pages/admin-view/features";
import CheckAuth from "@/components/common/check-auth";
import AdminUserPage from "@/pages/admin-view/user";

export const adminRoutes = {
  path: "/admin",
  element: (
    <CheckAuth>
      <AdminLayout />
    </CheckAuth>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "products", element: <AdminProducts /> },
    { path: "orders", element: <AdminOrders /> },
    { path: "users", element: <AdminUserPage /> },
    { path: "features", element: <AdminFeatures /> },
  ],
};
