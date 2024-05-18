import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { format } from "date-fns";

const OrderDataCard = styled(Box)({
   borderRadius: "20px",
   backgroundColor: "#fff",
   boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
   padding: "15px 15px 15px",
   margin: "15px",
});
const ContentBox = styled(Box)({
   marginTop: "10px",
});
function OrderDetailBottom({ order }) {
   return (
      <Box height="370px" bgcolor="#fff">
         <Box width="100%" height="40px" p="15px">
            <Typography fontWeight="600" fontSize="20px">
               Order Detail
            </Typography>
         </Box>
         <OrderDataCard>
            <Box display="flex" justifyContent="space-between">
               <Typography fontSize="16px" fontWeight="500">
                  Order ID : {order?.orderNumber}
               </Typography>
               <Typography fontSize="16px" fontWeight="600" textTransform="capitalize">
                   {order?.tableNo}
               </Typography>
            </Box>

            <ContentBox>
               <Typography fontSize="14px">Payment</Typography>
               <Typography fontSize="16px" fontWeight="600">
                  {order?.paymentDetails?.status === "success" ? "Paid" : ""}
               </Typography>
            </ContentBox>
            <ContentBox>
               <Typography fontSize="14px">Date</Typography>
               <Typography fontSize="16px" fontWeight="600">
                  {format(new Date(order?.subOrders?.[0].createdAt), "MMMM dd h:mm a")}
               </Typography>
            </ContentBox>
         </OrderDataCard>
      </Box>
   );
}

export default OrderDetailBottom;
