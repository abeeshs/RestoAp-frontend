import React from "react";
import MainFooterNav from "../components/common/MainFooterNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy } from "react";
const FixedBottomCard = lazy(() =>
   import("../components/cart/FixedBottomCard")
);
// const ProfilePage = lazy(() => import("../pages/Profile"));

function CommonRoute() {
   const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
   const { cartItems } = useSelector((state) => state.cart);
   const isFooterAvailable = useSelector((state) => state.footer.showFooter);
   console.log({ isFooterAvailable });

   const totalCartCount = cartItems?.reduce(
      (acc, item) => (acc += item.qty),
      0
   );
   return (
      <div style={{ position: "relative" }}>
         <Outlet />
         <>
            {isFooterAvailable && (
               <MainFooterNav isAuthenticated={isAuthenticated} />
            )}
            {totalCartCount > 0 && (
               <FixedBottomCard totalCartCount={totalCartCount} />
            )}
         </>
      </div>
   );
}

export default CommonRoute;
