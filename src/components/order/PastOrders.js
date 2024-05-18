import { Box, Typography } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";

import OrderEmpty from "../emptyPages.js/OrderEmpty";
import LoadingPage from "../common/LoadingPage";

function PastOrders() {
   const { allOrders, loading } = useSelector((state) => state.orders);

   if (loading) return <LoadingPage />;
   if (!loading && allOrders?.length <= 0) return <OrderEmpty />;
   return (
      <Box bgcolor="#fff" height="100vh">
         <Box
            sx={{
               width: "100%",
               height: "55px",
               boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
               p: "15px",
               backgroundColor: "#fff",
            }}
         >
            <Typography fontSize="18px">My Orders</Typography>
         </Box>
         <Box mb={5} p="0px 15px 60px 15px">
            {allOrders?.map((order) => (
               <OrderCard key={order?._id} order={order} />
            ))}
         </Box>
      </Box>
   );
}

export default PastOrders;
