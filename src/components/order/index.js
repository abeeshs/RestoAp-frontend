import React, { useEffect } from "react";
import LoadingPage from "../common/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import OrderEmpty from "../emptyPages.js/OrderEmpty";
import CurrentOrderCard from "./CurrentOrderCard";
import { Box, Typography } from "@mui/material";
import CurrentOrderDetail from "./CurrentOrderDetail";
import { getCurrentOrders } from "../../store/slices/currentOrders";

function Order() {
   const dispatch = useDispatch();
   const storeId = useSelector((state) => state.restaurent.storeId);

   const { currentOrders, loading } = useSelector(
      (state) => state.currentOrder
   );

   useEffect(() => {
      dispatch(getCurrentOrders(storeId));
      // eslint-disable-next-line
   }, [dispatch]);

   if (loading) return <LoadingPage />;
   if (!loading && currentOrders?.length === 0) return <OrderEmpty />;
   

   return (
      <>
         {currentOrders?.length > 1 ? (
            <Box width="100%" bgcolor="#fff">
               <Box
                  sx={{
                     width: "100%",
                     height: "55px",
                     boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                     p: "15px",
                     backgroundColor: "#fff",
                  }}
               >
                  <Typography fontSize="18px" fontWeight="500">
                     Orders
                  </Typography>
               </Box>
               <Box p="15px">
                  {currentOrders.map((order) => (
                     <CurrentOrderCard key={order._id} order={order} />
                  ))}
               </Box>
            </Box>
         ) : (
            <CurrentOrderDetail order={currentOrders[0]} />
         )}
      </>
   );
}

export default Order;
