import { Box, Grid } from "@mui/material";
import React from "react";

import loginImage from "../../assets/icons/png/home-banner-img.png";


export default function FooterSection() {
   
   return (
      <Grid item xs={12} md={12} display="flex" justifyContent="center">
         <Box height="100%">
            <img
               src={loginImage}
               alt="vector"
               style={{ objectFit: "cover", height: "100%" }}
            />
         </Box>
      </Grid>
   );
}
