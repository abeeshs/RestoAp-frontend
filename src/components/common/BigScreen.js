import styled from "@emotion/styled";
import React from "react";

import LandScapeImg from "../../assets/icons/png/LandscapeMode.png";
import { Box } from "@mui/material";

const MainBox = styled(Box)({
   display: "flex",
   justifyContent: "space-around",
   backgroundColor: "white",
   height: "100vh",
});

const ImageBox = styled(Box)({
   backgroundImage: `url(${LandScapeImg})`,
   backgroundSize: "contain",
   backgroundPosition:"center center ",
   display:"inline-block",
   backgroundRepeat:"no-repeat"
});

const BigScreenMessage = () => {
   return (
      <MainBox>
         <ImageBox width="45%"></ImageBox>
         <Box
            width="45%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
         >
            <Box fontWeight="700">ROTATE YOUR DEVICE</Box>
            <Box fontSize="12px" color="#a9abb2" textAlign="center" p={2}>
               We do not support landscape mode yet. Please go back to portrait
               mode for the best experience
            </Box>
         </Box>
      </MainBox>
   );
};

export default BigScreenMessage;
