import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DishImg from "../../assets/icons//png/Dish1.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
   addOnsAddToCart,
   decrementAddOnsCount,
   incrementAddOnsCount,
} from "../../store/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";

const OfferBannerBox = styled(Box)({
   minWidth: "160px",
   height: "100%",
   width: "160px",
   borderRadius: "15px",
   marginRight: "15px",
   backgroundColor: "#fff",
   boxShadow: "0px 0px 8px -1px rgba(0, 0, 0, 0.29)",
});

function AddOnsCard({ item, handleVariant, openExpandCart }) {
   const { _id, name, variants, price } = item;
 

   const addOns = useSelector((state) => state.cart.addOns);
  
   const dispatch = useDispatch();

   //function to handle addToCart
   const handleAddToCart = (id, name, price, variants) => {
      console.log(id);
      if (variants && variants.length > 0) {
     
         handleVariant(id);
         openExpandCart();
      }

      dispatch(
         addOnsAddToCart({
            itemId: id,
            qty: 1,
            price: Number(price),
            name: name,
            variants,
         })
      );
   };

   //Function to handle increment
   const handleIncrement = (id) => dispatch(incrementAddOnsCount(id));

   //Function to handle decrement
   const handleDecrement = (id) => dispatch(decrementAddOnsCount(id));

   return (
      <OfferBannerBox>
         <Box
            sx={{
               height: "100px",
               padding: "5px",
               borderRadius: "15px",
            }}
         >
            <img src={DishImg} alt="special" height="100%" width="100%" />
         </Box>
         <Box
            sx={{
               bgcolor: "white",
               padding: "0px 5px 5px 5px",
            }}
         >
            <Typography
               fontSize="16px"
               color="#212121"
               fontWeight="fontWeightMedium"
            >
               {name}
            </Typography>
         </Box>
         <Box
            sx={{
               padding: "0px 5px 5px 5px",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <Box display="flex" alignItems="center">
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
                  {price}
               </Typography>
            </Box>
            {addOns&&addOns?.find((ele) => ele.itemId === _id) ? (
               <Box display="flex" justifyContent="space-between" width="80px">
                  <IconButton
                     onClick={() => handleDecrement(_id)}
                     sx={{
                        border: "1px solid #BB3138",
                        padding: "2px",
                     }}
                  >
                     <RemoveIcon sx={{ fontSize: "18px", color: "#BB3138" }} />
                  </IconButton>
                  <Typography
                     sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        ml: "6px",
                        mr: "6px",
                     }}
                  >
                     {addOns?.find((ele) => ele.itemId === _id)?.qty ?? ""}
                  </Typography>
                  <IconButton
                     onClick={() => handleIncrement(_id)}
                     sx={{
                        backgroundColor: "#BB3138",
                        padding: "2px",
                        ":hover": {
                           backgroundColor: "#BB3138",
                        },
                     }}
                  >
                     <AddIcon sx={{ fontSize: "18px", color: "#fff" }} />
                  </IconButton>
               </Box>
            ) : (
               <IconButton
                  onClick={() => handleAddToCart(_id, name, price, variants)}
                  sx={{
                     backgroundColor: "#BB3138",
                     padding: "3px",
                     ":hover": {
                        backgroundColor: "#BB3138",
                     },
                  }}
               >
                  <AddIcon sx={{ fontSize: "18px", color: "#fff" }} />
               </IconButton>
            )}
         </Box>
      </OfferBannerBox>
   );
}

export default AddOnsCard;
