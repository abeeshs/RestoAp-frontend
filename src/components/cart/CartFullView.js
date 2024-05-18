import {
   Box,
   Drawer,
   Grid,
   IconButton,
   List,
   Button,
   Typography,
   styled,
} from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { addVariantToCart } from "../../store/slices/cart";
import SquareIcon from "../common/SquareIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PreperationTime from "../common/PreperationTime";
import toast, { Toaster } from "react-hot-toast";
import CommonButton from "../common/CommonButton";

const CloseBtn = styled(Button)({
   borderRadius: "6px",
   width: "30px",
   height: "30px",
   backgroundColor: "white",
   border: "none",
   boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
   fontSize: "14px",
   padding: 0,
});

function CartFullView({ open, closeExpandCart, item }) {
   const dispatch = useDispatch();

   const { cartItems } = useSelector((state) => state.cart);
   const currentCartItems = cartItems.filter((cart) => cart.itemId === item.id);
   const { storeDetails } = useSelector((state) => state.restaurent);

   const [selectedVariants, setSelectedVariants] = useState(currentCartItems);
   console.log({ selectedVariants });

   //Function to increment variant quantity
   const handleIncrementQuantity = (variant) => {
      const updatedVariant = selectedVariants.map((item) => {
         if (item.variant === variant) {
            item.qty += 1;
         }
         return item;
      });
      setSelectedVariants(updatedVariant);
   };

   // Function to decrement quantity by variant
   // const handleDecrementQuantity = (variant) => {
   //    const updatedVariant = selectedVariants.filter((item) => {
   //       if (item.variant === variant) {
   //          if (item.qty > 1) {
   //             item.qty -= 1;
   //             return true;
   //          } else {
   //             return false;
   //          }
   //       }
   //       return true;
   //    });
   //    console.log({ updatedVariant });
   //    setSelectedVariants(updatedVariant);
   // };
   const handleDecrementQuantity = (variantName) => {
      const updatedVariants = selectedVariants.map((item) => {
         if (item.variant === variantName) {
            return {
               ...item,
               qty: item.qty - 1,
            };
         }
         return item;
      });
      const newItems = updatedVariants.filter((item) => item.qty > 0);
      setSelectedVariants(newItems);
   };

   // Function to set selected item to state
   const handleAddToCart = (item, variant) => {
      const { id, name, preparationTime, foodCategory, variants, taxInclude } =
         item;
      const cartObject = {
         itemId: id,
         qty: 1,
         price: Number(variant?.offerPrice || variant?.price),
         name: name,
         variant: variant.name,
         foodCategory,
         prepTime: preparationTime,
         variants,
         taxInclude,
      };

      setSelectedVariants((prev) => [...prev, cartObject]);
   };

   // Funtion to handle add all selected variants to cart
   const handleAddItem = async () => {
      const cartItemWithoutSelectedItem = cartItems.filter(
         (cart) => cart.itemId !== item.id
      );
      await dispatch(
         addVariantToCart([...selectedVariants, ...cartItemWithoutSelectedItem])
      );
      toast.success("Item Added");
      closeExpandCart();
      setSelectedVariants("");
   };

   //Function to change the item variant
   // const handleVariantChange = (e, itemId, variants) => {
   //    const variant = variants?.find((item) => {
   //       return Number(item.offerPrice) === Number(e.target.value);
   //    });
   //    //  variant= variants?.find((item)=>item.price===e.target.value)

   //    dispatch(
   //       changeVariant({
   //          price: e.target.value,
   //          id: itemId,
   //          variant: variant.name,
   //       })
   //    );
   //    setItemVariant((state) => ({ ...state, itemId: e.target.value }));
   // };

   //Function to change the addOn item variant
   // const handleAddOnVariantChange = (e, itemId) => {
   //    dispatch(changeAddOnsVariant({ price: e.target.value, id: itemId }));
   //    setItemVariant((state) => ({ ...state, itemId: e.target.value }));
   // };

   if (!currentCartItems) return;

   return (
      <>
         <Toaster />

         <Drawer
            anchor="bottom"
            open={open}
            sx={{
               backgroundColor: "transparent",
               paddingBottom: "40px",
               "& .MuiPaper-root": {
                  backgroundColor: "#efefef00",
               },
            }}
         >
            <Box
               sx={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
               }}
            >
               <CloseBtn onClick={closeExpandCart}>
                  <ClearIcon sx={{ color: "#BB3138", height: "1.2em" }} />
               </CloseBtn>
            </Box>
            <Box
               sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "25px 25px 0px 0px",
               }}
            >
               <Box
                  p="15px"
                  pb="10px"
                  width="100%"
                  height="85px"
                  display="flex"
                  // flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                  boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
               >
                  <Box
                     display="flex"
                     flexDirection="column"
                     justifyContent="start"
                     alignItems="start"
                     width="250px"
                     height="50px"
                  >
                     <Box display="flex" bgcolor="white">
                        <Typography textAlign="center" component={"h5"}>
                           <SquareIcon icon="triangle" color="red" />
                        </Typography>
                        <Typography
                           ml="6px"
                           fontSize="18px"
                           fontWeight="fontWeightMedium"
                           textTransform="capitalize"
                        >
                           {item?.name}
                        </Typography>
                     </Box>
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                        }}
                     >
                        <Box mr={1}>
                           <Typography
                              fontSize="16px"
                              fontWeight="600"
                              color="#BB3138"
                           >
                              {storeDetails?.currencySymbol}{" "}
                              {item?.offerPrice || item?.price}
                           </Typography>
                        </Box>
                        <PreperationTime time={item?.preparationTime} />
                     </Box>
                  </Box>

                  <Box
                     display="flex"
                     justifyContent="space-between"
                     height="50px"
                  >
                     <Box display="flex" alignItems="center">
                        <CommonButton
                           text="Add Item"
                           fun={handleAddItem}
                           // isDisabled={
                           //    selectedVariants?.length > 0 ? false : true
                           // }
                        >
                           Add Item
                        </CommonButton>
                     </Box>
                  </Box>
               </Box>
               <Box height="200px" width="100%">
                  <Box
                     sx={{
                        margin: "15px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 7px -1px rgba(0, 0, 0, 0.29)",
                     }}
                  >
                     <Box
                        sx={{
                           height: "65px",
                           boxShadow: "0px 4px 5px -3px rgba(0, 0, 0, 0.29)",
                           borderRadius: "20px 20px 0px 0px",
                           p: "15px",
                        }}
                     >
                        <Typography fontSize="16px" fontWeight="600">
                           Quantity
                        </Typography>
                        <Typography fontSize="14px" fontWeight="400">
                           Select any 1 option
                        </Typography>
                     </Box>
                     <Box sx={{ p: "15px" }}>
                        <List component="div" disablePadding>
                           <Grid
                              container
                              display="flex"
                              justifyContent="space-between"
                           >
                              <Grid item xs={3} pt="2px">
                                 {item?.variants?.map((e) => (
                                    <Typography
                                       key={e._id}
                                       fontSize="14px"
                                       fontWeight="500"
                                       textTransform="capitalize"
                                       mb={1}
                                    >
                                       {e.name}
                                    </Typography>
                                 ))}
                              </Grid>
                              <Grid xs={5}>
                                 {item?.variants?.map((e) => (
                                    <Box key={e._id} display="flex">
                                       <Box
                                          key={e._id}
                                          mb={1}
                                          alignItems="center"
                                       >
                                          <Typography
                                             fontSize="16px"
                                             fontWeight="600"
                                             color="#BB3138"
                                          >
                                             {storeDetails?.currencySymbol}
                                             {e?.offerPrice}
                                          </Typography>
                                       </Box>
                                       <Box mb={1} ml={1} alignItems="center">
                                          {/* <CurrencyRupeeIcon
                                             sx={{
                                                fontSize: "13px",
                                                color: "#777",
                                             }}
                                          /> */}
                                          <Typography
                                             fontSize="14px"
                                             fontWeight="600"
                                             color="#777"
                                          >
                                             {storeDetails?.currencySymbol}
                                             {e?.price}
                                          </Typography>
                                       </Box>
                                    </Box>
                                 ))}

                                 {/* <FormControl fontSize="12px">
                                    <RadioGroup
                                       aria-labelledby="demo-radio-buttons-group-label"
                                       name="radio-buttons-group"
                                       onChange={(e) =>
                                          handleVariantChange(
                                             e,
                                             currentCartItems?.itemId,
                                             currentCartItems?.variants
                                          )
                                       }
                                       defaultValue={currentCartItems?.price}
                                       value={itemVariant[currentCartItems?.itemId]}
                                    >
                                       {currentCartItems?.variants?.map((ele) => (
                                          <FormControlLabel
                                             key={ele._id}
                                             sx={{
                                                width: "25px",
                                                height: "20px",
                                                mr: "0px",
                                                "& .MuiTypography-root": {
                                                   fontSize: "16px",
                                                   pr: "8px",
                                                   fontWeight: "500",
                                                },
                                             }}
                                             labelPlacement="start"
                                             value={
                                                ele?.offerPrice || ele.price
                                             }
                                             label={`${
                                                ele?.offerPrice || ele.price
                                             }`}
                                             control={
                                                <Radio
                                                   sx={{
                                                      ".MuiSvgIcon-root": {
                                                         fontSize: "1rem",
                                                      },
                                                   }}
                                                />
                                             }
                                          />
                                       ))}
                                    </RadioGroup>
                                 </FormControl> */}
                              </Grid>
                              <Grid
                                 xs={4}
                                 display="flex"
                                 flexDirection="column"
                                 alignItems="end"
                              >
                                 {item?.variants?.map((variant) => (
                                    <>
                                       {selectedVariants?.find(
                                          (item) =>
                                             item?.variant === variant.name
                                       ) ? (
                                          <Box
                                             display="flex"
                                             justifyContent="space-between"
                                             width="80px"
                                             marginBottom="10px"
                                             height="20px"
                                          >
                                             <IconButton
                                                onClick={() =>
                                                   handleDecrementQuantity(
                                                      variant.name
                                                   )
                                                }
                                                sx={{
                                                   border: "1px solid #BB3138",
                                                   padding: "2px",
                                                   width: "20px",
                                                   height: "20px",
                                                }}
                                             >
                                                <RemoveIcon
                                                   sx={{
                                                      fontSize: "18px",
                                                      color: "#BB3138",
                                                   }}
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
                                                {
                                                   selectedVariants.find(
                                                      (item) =>
                                                         item?.variant ===
                                                         variant.name
                                                   )?.qty
                                                }
                                             </Typography>
                                             <IconButton
                                                onClick={() =>
                                                   handleIncrementQuantity(
                                                      variant.name
                                                   )
                                                }
                                                sx={{
                                                   backgroundColor: "#BB3138",
                                                   padding: "2px",
                                                   width: "20px",
                                                   height: "20px",
                                                   ":hover": {
                                                      backgroundColor:
                                                         "#BB3138",
                                                   },
                                                }}
                                             >
                                                <AddIcon
                                                   sx={{
                                                      fontSize: "18px",
                                                      color: "#fff",
                                                   }}
                                                />
                                             </IconButton>
                                          </Box>
                                       ) : (
                                          <Box
                                             marginBottom="10px"
                                             display="flex"
                                             alignItems="center"
                                             height="20px"
                                          >
                                             <IconButton
                                                onClick={() =>
                                                   handleAddToCart(
                                                      item,
                                                      variant
                                                   )
                                                }
                                                sx={{
                                                   backgroundColor: "#BB3138",
                                                   padding: "2px",
                                                   width: "20px",
                                                   height: "20px",
                                                   ":hover": {
                                                      backgroundColor:
                                                         "#BB3138",
                                                   },
                                                }}
                                             >
                                                <AddIcon
                                                   sx={{
                                                      fontSize: "18px",
                                                      color: "#fff",
                                                   }}
                                                />
                                             </IconButton>
                                          </Box>
                                       )}
                                    </>
                                 ))}

                                 {/* <FormControl fontSize="12px">
                                    <RadioGroup
                                       aria-labelledby="demo-radio-buttons-group-label"
                                       name="radio-buttons-group"
                                       onChange={(e) =>
                                          handleVariantChange(
                                             e,
                                             currentCartItems?.itemId,
                                             currentCartItems?.variants
                                          )
                                       }
                                       defaultValue={currentCartItems?.price}
                                       value={itemVariant[currentCartItems?.itemId]}
                                    >
                                       {currentCartItems?.variants?.map((ele) => (
                                          <FormControlLabel
                                             key={ele._id}
                                             sx={{
                                                width: "25px",
                                                height: "20px",
                                                mr: "0px",
                                                "& .MuiTypography-root": {
                                                   fontSize: "16px",
                                                   pr: "8px",
                                                   fontWeight: "500",
                                                },
                                             }}
                                             labelPlacement="start"
                                             value={
                                                ele?.offerPrice || ele.price
                                             }
                                             label={`${
                                                ele?.offerPrice || ele.price
                                             }`}
                                             control={
                                                <Radio
                                                   sx={{
                                                      ".MuiSvgIcon-root": {
                                                         fontSize: "1rem",
                                                      },
                                                   }}
                                                />
                                             }
                                          />
                                       ))}
                                    </RadioGroup>
                                 </FormControl> */}
                              </Grid>
                           </Grid>
                        </List>
                     </Box>
                  </Box>
               </Box>
               {/* <CartItem /> */}
            </Box>
         </Drawer>
      </>
   );
}

export default CartFullView;
