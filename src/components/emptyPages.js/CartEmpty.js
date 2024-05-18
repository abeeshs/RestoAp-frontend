import React from "react";
import CartEmptyAnim from "../../assets/icons/animations/cookinganime.json";
import { Box, Button, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function CartEmpty() {
   const cartRef = useRef(null);
   const navigate =useNavigate()
   
   return (
      <Box height="100vh" bgcolor="#fff">
         <Box>
            <Lottie
               loop={false}
               lottieRef={cartRef}
               animationData={CartEmptyAnim}
            />
         </Box>
         <Box
            width="100%"
            display="flex"
            justifyContent="center"
           
         >
            <Box width="70%" textAlign="center">
               <Typography variant="body2">
                  Your cart is empty. Add something from the menu.
               </Typography>
               <Button sx={{marginTop:"10px",fontSize:"16px !important"}} onClick={()=>navigate('/')} variant="outlined">Browse Menu</Button>
            </Box>
         </Box>
      </Box>
   );
}

export default CartEmpty;
