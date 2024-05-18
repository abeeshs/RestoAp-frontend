import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import SquareIcon from "../common/SquareIcon";
import { useDispatch, useSelector } from "react-redux";
import {
   incrementCount,
   decrementCount,
   addToCart,
} from "../../store/slices/cart";
import PreperationTime from "../common/PreperationTime";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import defaultItemImage from "../../assets/icons/svg/defaultMenuImage.svg";

function MenuItemCard({ item, handleVariant, openExpandCart }) {
   const {
      name,
      variants,
      price,
      images,
      id,
      foodCategory,
      preparationTime,
      shortDescription,
      addOns,
      taxInclude,
   } = item;

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { cartItems } = useSelector((state) => state.cart);
   const { storeDetails } = useSelector((state) => state.restaurent);

   const getTotalQuantity = () => {
      const quantity = cartItems?.reduce((acc, item) => {
         if (item?.itemId === id) {
            acc += item.qty;
         }
         return acc;
      }, 0);
      return quantity;
   };

   // if (error) {
   //    toast.error(error)
   // }

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
         handleVariant(item);
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
   const handleDecrement = (e, id) => {
      e.stopPropagation();
      if (variants && variants.length > 0) {
         handleVariant(item);
         openExpandCart();
      } else {
         dispatch(decrementCount(id));
      }
   };

   const handleIncrement = (e, id) => {
      e.stopPropagation();
      if (variants && variants.length > 0) {
         handleVariant(item);
         openExpandCart();
      } else {
         dispatch(incrementCount(id));
      }
   };
   const handleDetailPage = () => {
      navigate(`/menuItem-view/${id}`);
   };

   return (
      <>
         <Box
            sx={{
               height: 140,
               boxShadow: "0px 0px 7px -1px rgba(0, 0, 0, 0.29)",
               borderRadius: "20px",
               padding: "15px",
               display: "flex",
               justifyContent: "space-between",
               mb: "15px",
               minWidth: "307px",
            }}
            onClick={(e) => {
               handleDetailPage(e);
            }}
         >
            <Box
               sx={{
                  width: "50%",
                  height: "100%",
                  borderRadius: "15px",
               }}
            >
               <img
                  src={images[0]?.name || defaultItemImage}
                  alt="item"
                  style={{
                     objectFit: "cover",
                     height: "100%",
                     width: "100%",
                     borderRadius: "15px",
                  }}
               />
            </Box>
            {/* <Box
               pl="10px"
               width="100%"
               display="flex"
               flexDirection="column"
               justifyContent="space-between"
            >
               <Box display="flex" alignItems="start">
                  <Typography textAlign="center" component={"h5"}>
                     {foodCategory === "Non-Veg" ? (
                        <SquareIcon icon="triangle" color="red" />
                     ) : (
                        <SquareIcon icon="circle" color="green" />
                     )}
                  </Typography>
                  <Typography
                     ml="6px"
                     fontSize="16px"
                     fontWeight="fontWeightMedium"
                  >
                     {name || "Chicken Biriyani"}
                  </Typography>
               </Box>
               <Box
                  mt="3px"
                  sx={{
                     overflow: "hidden",
                     height: "39px",
                     wordBreak: "break-all",
                  }}
               >
                  <Typography
                     fontSize="12px"
                     fontWeight="fontWeightRegular"
                     sx={{ overflow: "hidden" }}
                  >
                   {shortDescription.slice(0, 50)}
                   {shortDescription.length>50&&"..."}
                  </Typography>
               </Box>
               <Box display="flex" alignItems="center">
                  <Grid container>
                     <Grid item xs={4} display="flex" alignItems="center">
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
                           {price || 200}
                        </Typography>
                     </Grid>
                     <Grid item xs={4} display="flex" alignItems="center">
                        <PreperationTime time={preparationTime} />
                     </Grid>
                     <Grid item xs={4} display="flex" justifyContent="end">
                        {cartItems.find((ele) => ele.itemId === id) ? (
                           <Box
                              display="flex"
                              justifyContent="space-between"
                              width="80px"
                           >
                              <IconButton
                                 onClick={(e) => handleDecrement(e, id)}
                                 sx={{
                                    border: "1px solid #BB3138",
                                    padding: "2px",
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
                                 {cartItems.find((ele) => ele.itemId === id)
                                    ?.qty ?? ""}
                              </Typography>
                              <IconButton
                                 onClick={(e) => handleIncrement(e, id)}
                                 sx={{
                                    backgroundColor: "#BB3138",
                                    padding: "2px",
                                    ":hover": {
                                       backgroundColor: "#BB3138",
                                    },
                                 }}
                              >
                                 <AddIcon
                                    sx={{ fontSize: "18px", color: "#fff" }}
                                 />
                              </IconButton>
                           </Box>
                        ) : (
                           <IconButton
                              onClick={(e) =>
                                 handleAddToCart(
                                    e,
                                    id,
                                    name,
                                    price,
                                    variants,
                                    foodCategory,
                                    preparationTime,
                                    addOns
                                 )
                              }
                              sx={{
                                 backgroundColor: "#BB3138",
                                 padding: "3px",
                                 ":hover": {
                                    backgroundColor: "#BB3138",
                                 },
                              }}
                           >
                              <AddIcon
                                 sx={{ fontSize: "18px", color: "#fff" }}
                              />
                           </IconButton>
                        )}
                     </Grid>
                  </Grid>
               </Box>
            </Box> */}
            <Box
               pl="10px"
               width="100%"
               display="flex"
               flexDirection="column"
               justifyContent="space-between"
            >
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Typography textAlign="center" component={"h5"}>
                     {foodCategory === "Non-Veg" ? (
                        <SquareIcon icon="triangle" color="red" />
                     ) : (
                        <SquareIcon icon="circle" color="green" />
                     )}
                  </Typography>
                  <PreperationTime time={preparationTime} />
               </Box>
               <Box
                  mt="3px"
                  sx={{
                     overflow: "hidden",
                     height: "20px",
                     wordBreak: "break-all",
                  }}
               >
                  <Typography
                     fontSize="16px"
                     fontWeight="fontWeightMedium"
                     sx={{ overflow: "hidden" }}
                  >
                     {item?.name}
                  </Typography>
               </Box>
               <Box
                  mt="3px"
                  sx={{
                     overflow: "hidden",
                     height: "39px",
                     wordBreak: "break-all",
                  }}
               >
                  <Typography
                     fontSize="12px"
                     fontWeight="fontWeightRegular"
                     sx={{ overflow: "hidden" }}
                  >
                     {shortDescription?.slice(0, 50)}
                     {shortDescription?.length > 50 && "..."}
                  </Typography>
               </Box>
               <Box display="flex" alignItems="center">
                  <Grid container justifyContent="space-between" display="flex">
                     <Grid item xs={5} display="flex" alignItems="center">
                        <Box display="flex" width="90px">
                           <Typography
                              sx={{
                                 fontSize: "16px",
                                 color: "#BB3138",
                                 fontWeight: 600,
                              }}
                           >
                              {storeDetails?.currencySymbol}{" "}
                              {item?.offerPrice || price}
                           </Typography>
                        </Box>
                        {item?.offerPrice && item?.offerPrice !== price && (
                           <Box display="flex" alignItems="center">
                              {/* <del>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "14px",
                                       mt: "3px",
                                       color: "#777",
                                    }}
                                 />
                              </del> */}
                              {storeDetails?.currencySymbol}
                              <del>
                                 <Typography
                                    sx={{
                                       fontSize: "14px",
                                       color: "#777",
                                       fontWeight: 500,
                                    }}
                                 >
                                    {price}
                                 </Typography>
                              </del>
                           </Box>
                        )}
                     </Grid>

                     <Grid item xs={7} display="flex" justifyContent="end">
                        {cartItems?.find((ele) => ele.itemId === id) ? (
                           <Box
                              display="flex"
                              justifyContent="space-between"
                              width="80px"
                           >
                              <IconButton
                                 onClick={(e) => handleDecrement(e, id)}
                                 sx={{
                                    border: "1px solid #BB3138",
                                    padding: "2px",
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
                                 onClick={(e) => handleIncrement(e, id)}
                                 sx={{
                                    backgroundColor: "#BB3138",
                                    padding: "2px",
                                    ":hover": {
                                       backgroundColor: "#BB3138",
                                    },
                                 }}
                              >
                                 <AddIcon
                                    sx={{ fontSize: "18px", color: "#fff" }}
                                 />
                              </IconButton>
                           </Box>
                        ) : (
                           <IconButton
                              onClick={(e) =>
                                 handleAddToCart(
                                    e,
                                    id,
                                    name,
                                    item?.offerPrice || price,
                                    variants,
                                    foodCategory,
                                    preparationTime,
                                    addOns,
                                    taxInclude
                                 )
                              }
                              sx={{
                                 backgroundColor: "#BB3138",
                                 padding: "3px",
                                 ":hover": {
                                    backgroundColor: "#BB3138",
                                 },
                              }}
                           >
                              <AddIcon
                                 sx={{ fontSize: "18px", color: "#fff" }}
                              />
                           </IconButton>
                        )}
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Box>
      </>
   );
}

export default React.memo(MenuItemCard);
