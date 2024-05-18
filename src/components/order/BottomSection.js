import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonModal from "../common/CommonModal";
import ChoosePayment from "../payment/ChoosePayment";
import toast, { Toaster } from "react-hot-toast";
import * as paymentApi from "../../api/paymentAPI";

const CustomButton = styled(Button)({
   width: "",
   height: "30px",
   fontSize: "16px !important",
   fontWeight: "500",
});
function BottomSection({ order }) {
   console.log({ order });
   console.log(!order?.subOrders.find((item) => item?.orderStatus !== "open"));
   const navigate = useNavigate();
   const [openChoosePayment, setOpenChoosePayment] = useState(false);

   // Function to handle payment
   const handlePayNow = async () => {
      try {
         const response = await paymentApi.placeOrderWithPayNow(order?._id);
         if (response?.session?.url) {
            window.location.href = response.session.url;
         } else {
            console.log(response);
            if (response.code === 400) {
               toast.error(response.message);
               setOpenChoosePayment(false);
            } else {
               toast.error("Something went wrong");
               setOpenChoosePayment(false);
            }
         }
      } catch (err) {
         console.log(err);
         toast.error("Something went wrong");
         setOpenChoosePayment(false);

      }
   };

   const handlePlaceOrder = () => setOpenChoosePayment(true);
   const handleModalClose = () => setOpenChoosePayment(false);

   return (
      <>
         <Toaster />
         <Box minHeight="150px" bgcolor="#fff" mt="-14px">
            {order?.paymentDetails?.status !== "success" ? (
               <Box
                  container
                  m="12px"
                  display="flex"
                  justifyContent="space-between"
               >
                  <Box item xs={6}>
                     <CustomButton
                        variant="contained"
                        onClick={() => navigate("/")}
                     >
                        Add More
                     </CustomButton>
                  </Box>
                  {!order?.subOrders.find(
                     (item) => item?.orderStatus === "open"
                  ) && (
                     <Box item xs={6}>
                        {order?.payment}
                        <CustomButton
                           variant="contained"
                           float="right"
                           onClick={handlePlaceOrder}
                        >
                           Pay Now
                        </CustomButton>
                     </Box>
                  )}
               </Box>
            ) : (
               <Box
                  sx={{
                     padding: "15px",
                     display: "flex",
                     justifyContent: "space-between",
                  }}
               >
                  <Typography color="#008000" font>
                     Paid
                  </Typography>
                  <Typography color="#008000">
                     {order?.finalBillAmount}
                  </Typography>
               </Box>
            )}
         </Box>
         <CommonModal open={openChoosePayment} handleClose={handleModalClose}>
            <ChoosePayment
               order={order}
               setOpenChoosePayment={setOpenChoosePayment}
               handlePayNow={handlePayNow}
            />
         </CommonModal>
      </>
   );
}

export default BottomSection;
