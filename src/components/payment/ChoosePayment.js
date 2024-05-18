import { Box, Button, Grid, Typography, styled } from "@mui/material";
import React from "react";
// import * as paymentApi from "../../api/paymentAPI";
// import toast, { Toaster } from "react-hot-toast";

const PaymentBtn = styled(Button)({
   height: "40px",
   borderRadius: "10px",
   fontSize: "12px !important",
   mt: "20px",
});

function ChoosePayment({ setOpenChoosePayment, order,handlePayNow }) {
   console.log(order);
   // Function to handle payment
   // const handlePayNow = async () => {
   //    try {
   //       const response = await paymentApi.placeOrderWithPayNow(order?._id);
   //       if (response?.session?.url) {
   //          window.location.href = response.session.url;
   //       } else {
   //          // setOpenChoosePayment(false);
   //          // navigate("/");
   //       }
   //    } catch (err) {
   //       console.log(err);
   //       toast.error(err.message)
   //    }
   // };

   return (
      <>
    
         <Grid container p={2}>
            <Grid
               item
               xs={12}
               display="flex"
               justifyContent="center"
               alignItems="center"
            >
               <Typography component="h6" variant="h6" color="primary" mb={2}>
                  CHOOSE PAYMENT OPTION
               </Typography>
            </Grid>
            <Grid item xs={12}>
               <PaymentBtn
                  variant="contained"
                  fullWidth
                  onClick={() => handlePayNow("online")}
               >
                  PAY NOW
               </PaymentBtn>
            </Grid>
            <Grid item xs={12}>
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="10px"
               >
                  <Box
                     sx={{
                        height: "1.9px",
                        width: "45%",
                        backgroundColor: "black",
                     }}
                  ></Box>
                  <p style={{ margin: "0px 5px", color: "black" }}>OR</p>
                  <Box
                     sx={{
                        height: "1.9px",
                        width: "45%",
                        backgroundColor: "black",
                     }}
                  ></Box>
               </Box>
            </Grid>
            <Grid item xs={12}>
               <PaymentBtn
                  variant="contained"
                  fullWidth
                  onClick={() => setOpenChoosePayment(false)}
               >
                  PAY AT COUNTER
               </PaymentBtn>
            </Grid>
         </Grid>
      </>
   );
}

export default ChoosePayment;
