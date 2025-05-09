import ShoppingLayout from "@/components/shopping-view/layout";
import ShoppingHome from "@/pages/shopping-view/home";
import ShoppingListing from "@/pages/shopping-view/listing";
import ShoppingCheckout from "@/pages/shopping-view/checkout";
import ShoppingAccount from "@/pages/shopping-view/account";
import PaypalReturnPage from "@/pages/shopping-view/paypal-return";
import PaymentSuccessPage from "@/pages/shopping-view/payment-success";
import SearchProducts from "@/pages/shopping-view/search";
import CheckAuth from "@/components/common/check-auth";

export const shopRoutes = {
  path: "/shop",
  element: (
    <CheckAuth>
      <ShoppingLayout />
    </CheckAuth>
  ),
  children: [
    { path: "home", element: <ShoppingHome /> },
    { path: "listing", element: <ShoppingListing /> },
    { path: "checkout", element: <ShoppingCheckout /> },
    { path: "account", element: <ShoppingAccount /> },
    { path: "paypal-return", element: <PaypalReturnPage /> },
    { path: "payment-success", element: <PaymentSuccessPage /> },
    { path: "search", element: <SearchProducts /> },
  ],
};
