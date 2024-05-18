import { Box, Card, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


const CustomCard = styled(Card)({
   width: "100%",
   height: "110px",
   marginTop: "13px",
   borderRadius: "20px",
   backgroundColor: "#BB3138",
});

const ContentBox = styled(Box)({
   width: "100%",
});

function CurrentOrderCard({ order }) {
   console.log({order});
   const navigate = useNavigate();
   const handleSelectOrder = () => navigate(`/current-order/?id=${order?._id}`);
   const allItems = order?.subOrders?.flatMap((order) => order.orderItems);
   const totalItems = allItems.length;
   return (
      <CustomCard onClick={handleSelectOrder}>
         <Box
            height="70px"
            borderBottom="1px solid #D9D9D9"
            display="flex"
            p="10px"
         >
            <ContentBox>
               <Box display="flex" justifyContent="space-between">
                  <Typography
                     fontSize="18px"
                     color="#fff"
                     fontWeight="500"
                     textTransform="capitalize"
                  >
                     Order ID : {order?.orderNumber}
                  </Typography>

                  <Box display="flex" alignItems="center">
                     <Typography variant="body2" color="#fff">
                        {order?.paymentDetails&&order?.paymentDetails?.status?'Paid':'Not Paid'}
                     </Typography>
                  </Box>
               </Box>

               <Box
                  width="180px"
                  height="22px"
                  white-space="nowrap"
                  overflow="hidden"
                  sx={{
                     color: "#fff",
                  }}
               >
                  <Typography fontSize="14px" textTransform="capitalize">
                     Items: {totalItems}
                  </Typography>
               </Box>
               {/* <Typography fontSize="12px" color="#fff">
             {orderId}
          </Typography> */}
            </ContentBox>
         </Box>
         <Box
            display="flex"
            justifyContent="space-between"
            p="3px 15px 0px"
            alignItems="center"
            width="100%"
            height="40px"
         >
            <Typography fontSize="13px" color="#fff">
               {format(new Date(order?.createdAt), "MMMM dd h:mm a")}
            </Typography>

            <Box display="flex">
               <CurrencyRupeeIcon
                  sx={{
                     fontSize: "15px",
                     mt: "3px",
                     color: "#fff",
                  }}
               />
               <Typography
                  sx={{
                     fontSize: "16px",
                     color: "#fff",
                     fontWeight: 600,
                  }}
               >
                  {order?.finalBillAmount}
               </Typography>
            </Box>
         </Box>
      </CustomCard>
   );
}

export default CurrentOrderCard;
