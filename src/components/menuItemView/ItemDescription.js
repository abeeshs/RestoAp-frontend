import { Box, styled, Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import PreperationTime from "../common/PreperationTime";
import SquareIcon from "../common/SquareIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
   addToCart,
   decrementCount,
   incrementCount,
   selectCartById,
} from "../../store/slices/cart";
import { useDispatch, useSelector } from "react-redux";

const DescBox = styled(Box)({
   maxWidth: "400px",
   height: "100%",
   width: "100%",
});

function ItemDescription({ currentItem, openExpandCart }) {
   const dispatch = useDispatch();

   const { storeDetails } = useSelector((state) => state.restaurent);

   const { cartItems } = useSelector((state) => state.cart);
   const cartItem = useSelector((state) =>
      selectCartById(state, currentItem?.id)
   );

   //function to handle addToCart
   const handleAddToCart = (
      e,
      id,
      name,
      price,
      variants,
      foodCategory,
      prepTime,
      addOns,
      taxInclude
   ) => {
      e.stopPropagation();
      if (variants && variants.length > 0) {
         openExpandCart();
      } else {
         dispatch(
            addToCart({
               itemId: id,
               qty: 1,
               price: Number(price),
               name: name,
               variants,
               foodCategory,
               prepTime,
               addOns,
               taxInclude,
            })
         );
      }
   };
   const handleDecrement = (id, variant) => {
      if (variant) {
         openExpandCart();
      } else {
         dispatch(decrementCount(id));
      }
   };
   const handleIncrement = (id, variant) => {
      if (variant) {
         openExpandCart();
      } else {
         dispatch(incrementCount(id));
      }
   };

   const getTotalQuantity = () => {
      const quantity = cartItems?.reduce((acc, item) => {
         if (item?.itemId === currentItem.id) {
            acc += item.qty;
         }
         return acc;
      }, 0);
      return quantity;
   };

   return (
      <Box
         bgcolor="white"
         height=""
         width="100%"
         p={1}
         display="flex"
         justifyContent="center"
      >
         <DescBox>
            <Grid container justifyContent="space-between">
               <Grid item xs={7} flex="start">
                  <Box display="flex" alignItems="start">
                     <Typography textAlign="center" component={"h5"} mt="5px">
                        {currentItem?.foodCategory === "Non-Veg" ? (
                           <SquareIcon icon="triangle" color="red" />
                        ) : (
                           <SquareIcon icon="circle" color="green" />
                        )}
                     </Typography>
                     <Typography
                        fontSize="18px"
                        fontWeight="500"
                        textTransform="capitalize"
                        ml="8px"
                     >
                        {currentItem?.name}
                     </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                     <Typography
                        fontSize="16px"
                        fontWeight="600"
                        color="#BB3138"
                        mr={2}
                     >
                        {storeDetails?.currencySymbol}{" "}
                        {currentItem?.offerPrice || currentItem?.price}
                     </Typography>
                     {/* {currentItem?.offerPrice && (
                        <del>{storeDetails?.currencySymbol}</del>
                     )} */}
                     {currentItem?.offerPrice && (
                        <del>
                           <Typography
                              sx={{
                                 fontSize: "14px",
                                 color: "#777",
                                 fontWeight: 500,
                              }}
                           >
                             {storeDetails?.currencySymbol} {currentItem?.price}
                           </Typography>
                        </del>
                     )}
                  </Box>
               </Grid>
               <Grid item xs={5} display="flex" justifyContent="space-between">
                  <PreperationTime time={currentItem?.preparationTime} />
                  {cartItem ? (
                     <Box
                        display="flex"
                        justifyContent="space-between"
                        width="80px"
                     >
                        <IconButton
                           onClick={() =>
                              handleDecrement(
                                 cartItem?.itemId,
                                 cartItem?.variant
                              )
                           }
                           sx={{
                              border: "1px solid #BB3138",
                              padding: "2px",
                              height: "25px",
                              width: "25px",
                           }}
                        >
                           <RemoveIcon
                              sx={{ fontSize: "18px", color: "#BB3138" }}
                           />
                        </IconButton>
                        <Typography
                           sx={{
                              fontSize: "16px",
                              fontWeight: 600,
                              ml: "6px",
                              mr: "6px",
                           }}
                        >
                           {getTotalQuantity()}
                        </Typography>
                        <IconButton
                           onClick={() =>
                              handleIncrement(
                                 cartItem?.itemId,
                                 cartItem?.variant
                              )
                           }
                           sx={{
                              backgroundColor: "#BB3138",
                              padding: "2px",
                              height: "25px",
                              width: "25px",
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
                        onClick={(e) =>
                           handleAddToCart(
                              e,
                              currentItem?.id,
                              currentItem?.name,
                              currentItem?.price,
                              currentItem?.variants,
                              currentItem?.foodCategory,
                              currentItem?.preparationTime,
                              currentItem?.addOns,
                              currentItem?.taxInclude
                           )
                        }
                        sx={{
                           backgroundColor: "#BB3138",
                           padding: "3px",
                           height: "25px",
                           width: "25px",
                           ":hover": {
                              backgroundColor: "#BB3138",
                           },
                        }}
                     >
                        <AddIcon sx={{ fontSize: "18px", color: "#fff" }} />
                     </IconButton>
                  )}
               </Grid>
            </Grid>
            <Grid container>
               <Grid item xs={12}>
                  <Typography fontSize="12px" color="#212121">
                     <div
                        dangerouslySetInnerHTML={{
                           __html: currentItem?.description,
                        }}
                     />
                  </Typography>
               </Grid>

               {currentItem && currentItem?.videos?.length > 0 && (
                  <Grid item xs={12}>
                     <Typography variant="subtitle2" mr="">
                        Video
                     </Typography>
                  </Grid>
               )}
            </Grid>
         </DescBox>
      </Box>
   );
}

export default ItemDescription;
