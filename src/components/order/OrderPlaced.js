import { Box,Typography, styled } from "@mui/material";
import React from "react";

import VectorImg from "../../assets/icons/svg/VectImg.svg";
import TickIcon from "../../assets/icons/png/TickIcon.png";

const MainBox = styled(Box)({
   height: "100vh",
   width: "100%",
   backgroundColor: "#BB3138",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
   backgroundImage: `url(${VectorImg})`,
});
function OrderPlaced() {
   return (
      <MainBox>
         <Box  display="flex" alignItems="center" justifyContent="center">
            <div
               style={{
                  height: "180px",
                  width: "180px",
                 
               }}
            >
               <img src={TickIcon} alt="logo" />
            </div>
         </Box>
         <Box display="flex" justifyContent="start" textAlign="center">
            <Typography fontSize="24px" fontWeight="600" color="#fff" textAlign="center">Your Order Placed</Typography>
         </Box>
      </MainBox>
   );
}

export default OrderPlaced;
