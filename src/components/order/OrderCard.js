import styled from "@emotion/styled";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
// import RestImg from "../../assets/icons/png/Food.png";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import StarIcon from "@mui/icons-material/Star";

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

function OrderCard({ order }) {
   const navigate = useNavigate();

   //Function to navigate to specific page according to order status
   const handleNavigate = () => {
      // if (order?.orderStatus === "Completed") {
      navigate("/order-summary", { state: { order } });
      // } else {
      //    navigate("/current-order", { state: { item } });
      // }
   };
   return (
  
      <CustomCard onClick={handleNavigate}>
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
                     {order?.storeName}
                  </Typography>

                  <Box display="flex" alignItems="center">
                     <StarIcon
                        fontSize="10px"
                        m="6px 0px 0px"
                        sx={{ color: "#FEB700" }}
                     />
                     <Typography variant="body2" color="#fff">
                        4.1
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
                     {order?.storeName}
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
               {format(
                  new Date(order?.subOrders?.[0].createdAt),
                  "MMMM dd h:mm a"
               )}
            </Typography>
            <Typography fontSize="16px" color="#fff" fontWeight="600">
               ₹ {order?.finalBillAmount}
            </Typography>
         </Box>
      </CustomCard>
   );
}

export default OrderCard;
