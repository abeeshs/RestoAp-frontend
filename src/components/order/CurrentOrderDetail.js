import React from "react";
import ViewDetailSection from "./ViewDetailSection";
import BillDetailSection from "./BillDetailSection";
import BottomSection from "./BottomSection";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function CurrentOrderDetail() {
   const [searchParams] = useSearchParams();

   const orderId = searchParams.get("id");

   const { currentOrders } = useSelector((state) => state.currentOrder);
   let singleOrder = currentOrders;
   if (currentOrders?.length > 1) {
      singleOrder = currentOrders?.find((order) => order._id === orderId);
      singleOrder = [singleOrder];
   }

   return (
      <Box height="100vh" bgcolor="#fff">
         <ViewDetailSection order={singleOrder[0]} />
         <BillDetailSection order={singleOrder[0]} />
         <BottomSection order={singleOrder[0]} />
      </Box>
   );
}

export default CurrentOrderDetail;
