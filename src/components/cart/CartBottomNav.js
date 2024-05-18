import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { ShoppingCart, ArrowRight, ArrowDropUp } from "@mui/icons-material";
// import { useSelector } from "react-redux";
import BottomNavbar from "../common/BottomNavbar";
import { useNavigate } from "react-router-dom";

const CustomBox = styled(Box)({
   padding: "2px",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
});

function CartBottomNav({ toggleHandle, cartCount }) {
   const navigate =useNavigate()
  
   return (
      <>
         <BottomNavbar>
            <CustomBox>
               <ShoppingCart
                  sx={{ color: "#fff", width: "27px", height: "27px " }}
               />
            </CustomBox>
            <CustomBox display="flex" onClick={toggleHandle}>
               <Typography variant="body2" color="#fff">
                  {cartCount} ITEMS ADDED
               </Typography>
               <Typography>
                  <ArrowDropUp sx={{ color: "#fff", mt: "2px" }} />
               </Typography>
            </CustomBox>
            <CustomBox>
               <Button
                  sx={{
                     backgroundColor: "#fff",
                     fontSize: "14px !important",
                     fontWeight: 500,
                     padding: "2px 8px",
                     ":hover": {
                        backgroundColor: "#fff",
                     },
                  }}
                  onClick={() => navigate("/cart")}
                
                  endIcon={<ArrowRight sx={{ marginLeft: "2px" }} />}
               >
                  NEXT
               </Button>
            </CustomBox>
         </BottomNavbar>
         {/* <CartCard>
            
         </CartCard> */}
      </>
   );
}

export default CartBottomNav;
