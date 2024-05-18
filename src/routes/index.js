import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import UnprotectedRoute from "./UnprotectedRoute";
import CommonRoute from "./CommonRoute";
import ErrorPage from "../components/common/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
const HomePage = lazy(() => import("../pages/Home"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const SignInPage = lazy(() => import("../pages/Auth"));
const PaymentFailedPage = lazy(() =>
   import("../pages/Payment/PaymentFailedPage")
);
const PaymentSuccessPage = lazy(() =>
   import("../pages/Payment/PaymentSuccessPage")
);

const CartPage = lazy(() => import("../pages/Cart"));
const OrderPage = lazy(() => import("../pages/Order"));
const AllOrdersPage = lazy(() => import("../pages/Order/AllOrderPage"));
const OrderSummaryPage = lazy(() => import("../components/order/OrderSummary"));
const SearchPage = lazy(() => import("../pages/Search"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const MenuItemViewPage = lazy(() => import("../components/menuItemView"));
const TodaySpecialPage = lazy(() => import("../components/TodaySpecial"));
const CurrentOrderPage = lazy(() =>
   import("../components/order/CurrentOrderDetail")
);

const AppRoute = createBrowserRouter([
   {
      path: "/",
      element: (
         <ErrorBoundary FallbackComponent={ErrorPage}>
            <CommonRoute />
         </ErrorBoundary>
      ),
      children: [
         {
            path: "/",
            element: <HomePage />,
         },
         {
            path: "/search",
            element: <SearchPage />,
         },
         {
            path: "/menuItem-view/:id",
            element: <MenuItemViewPage />,
         },
         {
            path: "/menuItem/today-special",
            element: <TodaySpecialPage />,
         },
         {
            path: "/",
            element: <ProtectedRoute />,
            children: [
               {
                  path: "/payment-failed",
                  element: <PaymentFailedPage />,
               },
               {
                  path: "/payment-success",
                  element: <PaymentSuccessPage />,
               },

               {
                  path: "/order",
                  element: <OrderPage />,
               },
               {
                  path: "/previous-orders",
                  element: <AllOrdersPage />,
               },
               {
                  path: "/order-summary",
                  element: <OrderSummaryPage />,
               },
               {
                  path: "/profile",
                  element: <ProfilePage />,
               },
               {
                  path: "/current-order",
                  element: <CurrentOrderPage />,
               },
            ],
         },
      ],
   },
   {
      path: "/cart",
      element: <CartPage />,
   },
   {
      path: "/auth",
      element: (
         <ErrorBoundary FallbackComponent={ErrorPage}>
            <UnprotectedRoute />
         </ErrorBoundary>
      ),
      children: [
         {
            path: "sign-in",
            element: <SignInPage />,
         },
      ],
   },
   {
      path: "*",
      element: <ErrorPage />,
   },
]);

export default AppRoute;
