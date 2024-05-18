import React from "react";
//Restoap logo
import logowhite from "../../assets/icons/png/logowhite.png";
import { Box, Typography, styled } from "@mui/material";
import VectorImg from "../../assets/icons/svg/VectImg.svg";

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

function LandingPage() {
   return (
      <MainBox>
         <Box height="82%" display="flex" alignItems="center" justifyContent="center">
            <div
               style={{
                  height: "180px",
                  width: "180px",
                 
               }}
            >
               <img src={logowhite} alt="logo" />
            </div>
         </Box>
         <Box display="flex" justifyContent="start">
            <Typography fontSize="18px" fontWeight="500" color="#fff">Welcome To RestoAp</Typography>
         </Box>
      </MainBox>
   );
}

export default LandingPage;
