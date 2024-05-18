import { Box, Grid, styled } from "@mui/material";
import React from "react";

//logo image
import appLogoBlack from "../../assets/icons/png/appLogoBlack.png";

const HeaderBox = styled(Box)({
   width: "100% ",
   height: "100px",
   display: "flex",
   justifyContent: "center",
   marginBottom: "20px",
});

const HeaderSection = () => {
   
   return (
      <Grid
         item
         xs={12}
         md={12}
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <HeaderBox>
            <Box width="135px">
               <img src={appLogoBlack} alt="logo" />
            </Box>
         </HeaderBox>
      </Grid>
   );
};

export default HeaderSection;
