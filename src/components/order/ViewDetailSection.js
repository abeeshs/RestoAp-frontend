import { Box, Grid, Typography, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const StatusBox = styled(Box)(({ color }) => ({
   backgroundColor: color,
   borderRadius: "8px",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   // width: "50px",
   height: "20px",
   padding: "5px",
}));

function ViewDetailSection({ order }) {
   const currentOrder = order.subOrders.flatMap((item) =>
      item.orderItems.concat(item.addons)
   );
   const { storeDetails } = useSelector((state) => state.restaurent);

   //Fuction that return status box according to the status
   const getStatus = (status) => {
      switch (status) {
         case "open":
            return { color: "#FEB700", text: "Pending" };
         case "preparing":
            return { color: "#FE6B00", text: "Preparing" };
         case "readytoserve":
            return { color: "#008000", text: "Ready" };
         default:
            return { color: "#FE0000", text: "Delivered" };
      }
   };

   return (
      <Box bgcolor="#fff">
         <Box
            sx={{
               width: "100%",
               height: "65px",
               boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
               p: "15px 15px 0px 15px",
               backgroundColor: "#fff",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <Box height="100%">
               <Typography fontWeight="500" fontSize="18px">
                  Orders
               </Typography>
               <Typography fontSize="14px" textTransform="capitalize">
                  {order?.tableNo}
               </Typography>
            </Box>
            <Box display="flex" alignItems="end" height="100%">
               <Typography fontWeight="500" fontSize="14px">
                  Order No : {order?.orderNumber}
               </Typography>
            </Box>
         </Box>
         <Box
            sx={{
               width: "100%",
               borderRadius: "25px",
               bgcolor: "#fff",
               padding: "0px 15px 0px 15px",
               mt: "15px",
            }}
         >
            {currentOrder?.map((item) => (
               <Grid
                  container
                  mb="7px"
                  key={item?._id}
                  borderBottom="1px dashed grey"
               >
                  <Grid item xs={7}>
                     <Box display="flex" alignItems="center">
                        <Typography
                           ml="6px"
                           fontSize="16px"
                           fontWeight="fontWeightMedium"
                        >
                           {item?.name}
                        </Typography>
                     </Box>
                     {/* <CommonItemName name={item?.price} /> */}
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="16px" fontWeight="600">
                        {item?.quantity}
                     </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" justifyContent="end">
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {storeDetails?.currencySymbol}
                        {item.finalPrice.toFixed(2)}
                     </Typography>
                  </Grid>
                  <Grid item xs={7} alignItems="center" >
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {storeDetails?.currencySymbol}
                        {item?.finalPrice / item?.quantity}
                     </Typography>
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="14px">
                        {item?.variant?.variantName}
                     </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" justifyContent="end" mb="">
                     <StatusBox
                        variant="contained"
                        color={getStatus(item?.itemStatus).color}
                     >
                        <Typography
                           sx={{
                              color: "white",
                              fontSize: "10px",
                              fontWeight: "500",
                           }}
                        >
                           {getStatus(item?.itemStatus).text}
                        </Typography>
                     </StatusBox>
                  </Grid>
               </Grid>
            ))}
            {/* <Grid container mb="7px">
               <Grid item xs={7}>
                  <CommonItemName name="Chicken Biriyani" />
               </Grid>
               <Grid item xs={2}>
                  <CommonItemName name="2" />
               </Grid>
               <Grid item xs={3}>
                  <StatusBox variant="contained" color={"orange"}>
                     <Typography sx={{ color: "white", fontSize: "14px" }}>
                        Prepairing
                     </Typography>
                  </StatusBox>
               </Grid>
            </Grid> */}
            {/* {additional.length > 0 && (
               <>
                  <Box mb="7px" mt="5px" borderBottom="1px dashed grey">
                     <Typography fontSize="18px" fontWeight="600">
                        Additional Orders
                     </Typography>
                  </Box>
               </>
            )} */}
            {/* {additional.map((item) => (
               <Grid
                  container
                  mb="7px"
                  key={item?._id}
                  borderBottom="1px dashed grey"
               >
                  <Grid item xs={7}>
                     <Box display="flex" alignItems="center">
                        <Typography
                           ml="6px"
                           fontSize="16px"
                           fontWeight="fontWeightMedium"
                        >
                           {item?.name}
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="16px" fontWeight="600">
                        {item?.qty}
                     </Typography>
                  </Grid>
                  <Grid
                     item
                     xs={3}
                     display="flex"
                     justifyContent="end"
                     alignItems="center"
                  >
                     <CurrencyRupeeIcon
                        sx={{
                           fontSize: "15px",
                           pt: "1px",
                           color: "#BB3138",
                        }}
                     />
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {item?.qty * item?.price}
                     </Typography>
                  </Grid>
                  <Grid item xs={7} display="flex" alignItems="center">
                     <CurrencyRupeeIcon
                        sx={{
                           fontSize: "15px",
                           pt: "1px",
                           color: "#BB3138",
                        }}
                     />
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {item?.price || 200}
                     </Typography>
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="14px">Full</Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" justifyContent="end" mb="">
                     <StatusBox
                        variant="contained"
                        color={getStatus(item?.status).color}
                     >
                        <Typography
                           sx={{
                              color: "white",
                              fontSize: "10px",
                              fontWeight: "500",
                           }}
                        >
                           {getStatus(item?.status).text}
                        </Typography>
                     </StatusBox>
                  </Grid>
               </Grid>
            ))} */}

            {/* {order?.addOns?.length > 0 && (
               <>
                  <Box mb="7px" mt="5px" borderBottom="1px dashed grey">
                     <Typography fontSize="18px" fontWeight="500">
                        AddOns
                     </Typography>
                  </Box>
               </>
            )} */}
            {/* {order?.addOns.map((item) => (
               <Grid
                  container
                  mb="7px"
                  key={item?._id}
                  borderBottom="1px dashed grey"
               >
                  <Grid item xs={7}>
                     <Box display="flex" alignItems="center">
                        <Typography
                           ml="6px"
                           fontSize="16px"
                           fontWeight="fontWeightMedium"
                        >
                           {item?.name}
                        </Typography>
                     </Box>
                   
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="16px" fontWeight="600">
                        {item?.qty}
                     </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" justifyContent="end">
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {item?.qty * item?.price}
                     </Typography>
                  </Grid>
                  <Grid item xs={7} display="flex" alignItems="center">
                     <CurrencyRupeeIcon
                        sx={{
                           fontSize: "15px",
                           pt: "1px",
                           color: "#BB3138",
                        }}
                     />
                     <Typography
                        sx={{
                           fontSize: "16px",
                           color: "#BB3138",
                           fontWeight: 600,
                        }}
                     >
                        {item?.price || 200}
                     </Typography>
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent="center">
                     <Typography fontSize="14px">Full</Typography>
                  </Grid>
                  <Grid item xs={3} display="flex" justifyContent="end"></Grid>
               </Grid>
            ))} */}
         </Box>
      </Box>
   );
}

export default ViewDetailSection;
