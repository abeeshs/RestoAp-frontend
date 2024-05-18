import React, { useRef } from "react";
import Lottie from "lottie-react";
import failedAnimation from "../../assets/icons/animations/animation_lkntaene.json";
import { Box, Typography } from "@mui/material";

function PaymentFail() {
   const failedRef = useRef(null);
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
            <Lottie
               loop={false}
               lottieRef={failedRef}
               animationData={failedAnimation}
            />
         </Box>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>Payment Failed</Typography>
         </Box>
      </Box>
   );
}

export default PaymentFail;
