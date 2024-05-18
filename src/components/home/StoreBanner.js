import React from "react";
import { Grid, Typography, styled } from "@mui/material";

// Icons
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import HomeBanner from "../../assets/icons//png/bannerImg.png";

const CustomCard = styled(Box)({
   position: "relative",
   textAlign: "center",
   justifyContent: "center",
   maxWidth: 900,
   height: "200px",
   display: "flex",
});

const StoreBanner = () => {
   //GET store details from redux
   const store = useSelector((state) => state.restaurent.storeDetails);
   return (
      <CustomCard>
         <img
            src={HomeBanner}
            alt="Store"
            style={{ width: "100%", objectFit: "cover" }}
         />
         <Grid
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexDirection: "column",
               position: "absolute",
               top: "30%",
               height: "50%",
            }}
         >
            <Typography variant="h5" gutterBottom color="#fff">
               {store?.name}
            </Typography>
            <Typography variant="body2" color="#fff">
               North Indian Foods
            </Typography>
         </Grid>
      </CustomCard>
   );
};

export default StoreBanner;
