import { Box } from "@mui/system";
import Lottie from "lottie-react";
import React from "react";

import succesAnimation from '../../assets/icons/animations/paymentSuccess.json'
import { Typography } from "@mui/material";
function PaymentSuccess() {
   return (
      <Box
         display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         bgcolor="#fff"
         height="100vh"
      >
         <Box>
            <Lottie loop={false} animationData={succesAnimation} />
         </Box>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>Payment Success</Typography>
         </Box>
      </Box>
   );
}

export default PaymentSuccess;
