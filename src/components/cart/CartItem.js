import {
   Box,
   Grid,
   Button,
   Collapse,
   FormControl,
   FormControlLabel,
   RadioGroup,
   Typography,
   styled,
   Radio,
   List,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   changeVariant,
   decrementCount,
   incrementCount,
} from "../../store/slices/cart";

const AddButton = styled(Button)({
   backgroundColor: "white",
   fontSize: "17px !important",
   textAlign: "center",
   color: "#BB3138",
   height: "25px",
   width: "80px",
   boxShadow: " 0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
   justifyContent: "space-between",
});
const ItemName = styled(Typography)({
   color: "#212121",
   fontSize: "18px",
   fontStyle: "normal",
   fontWeight: 500,
   lineHeight: "21px",
});

function CartItem() {
   const [open, setOpen] = useState([]);
   const [itemVariant, setItemVariant] = useState({});
   const dispatch = useDispatch();

   //Function to change the item variant
   const handleVariantChange = (e, itemId) => {
      dispatch(changeVariant({ price: e.target.value, id: itemId }));
      setItemVariant((state) => ({ ...state, itemId: e.target.value }));
   };

   //Get all cart items from redux
   const allCartItems = useSelector((state) => state.cart.cartItems);

   //Function to handle show/hide item variants
   const handleClick = (num) => {
      if (open.includes(num)) {
         setOpen(open.filter((item) => item !== num));
      } else {
         setOpen((prev) => [...prev, num]);
      }
   };

   //Function to handle decrement cart count
   const handleDecrement = (id) => {
      dispatch(decrementCount(id));
   };

   //Function to handle increment the cart count
   const handleIncrement = (id) => {
      dispatch(incrementCount(id));
   };

   return (
      <List
         sx={{
            width: "100%",
            bgcolor: "white",
            maxHeight: 300,
            overflowY: "scroll",
         }}
      >
         {allCartItems.map((item) => {
            return (
               <Box
                  display="flex"
                  bgcolor="white"
                  flexDirection="column"
                  key={item?.itemId}
                  pb={2}
               >
                  <Grid
                     container
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Grid item xs={6} md={6} lg={6}>
                        <ItemName variant="body2">{item.name}</ItemName>
                        <Typography variant="body1">
                           <span>₹</span>
                           {item.price}
                           {item?.variants && (
                              <span style={{ marginLeft: "10px" }}>
                                 {open.includes(item.itemId) ? (
                                    <KeyboardArrowUpIcon
                                       onClick={() => handleClick(item.itemId)}
                                       sx={{
                                          fontSize: "16px",
                                          color: "#BB3138",
                                       }}
                                    />
                                 ) : (
                                    <KeyboardArrowDownIcon
                                       onClick={() => handleClick(item.itemId)}
                                       sx={{
                                          fontSize: "16px",
                                          color: "#BB3138",
                                       }}
                                    />
                                 )}
                              </span>
                           )}
                        </Typography>
                     </Grid>
                     <Grid item xs={3} display="flex" justifyContent="end">
                        {
                           <AddButton variant="">
                              <span
                                 onClick={() => handleDecrement(item.itemId)}
                              >
                                 -
                              </span>
                              <span>{item.qty}</span>
                              <span
                                 onClick={() => handleIncrement(item.itemId)}
                              >
                                 +
                              </span>
                           </AddButton>
                        }
                     </Grid>

                     <Grid item xs={3} display="flex" justifyContent="end">
                        <Typography variant="body1">
                           <span>₹</span>
                           {item.price * item.qty}
                        </Typography>
                     </Grid>
                  </Grid>
                  <Collapse
                     in={open.includes(item.itemId)}
                     timeout="auto"
                     unmountOnExit
                  >
                     <List component="div" disablePadding>
                        <Grid
                           container
                           display="flex"
                           justifyContent="space-around"
                        >
                           <Grid item xs={6} pt="2px">
                              {item?.variants &&
                                 Object.keys(item.variants).map((e) => (
                                    <Typography key={e} fontSize="14px">{e}</Typography>
                                 ))}
                           </Grid>
                           <Grid item xs={6} textAlign="end">
                              <FormControl fontSize="12px">
                                 <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    onChange={(e) =>
                                       handleVariantChange(e, item.itemId)
                                    }
                                    defaultValue={item.price}
                                    value={itemVariant[item.itemId]}
                                 >
                                    {item?.variants &&
                                       Object.entries(item.variants).map(
                                          (ele) => (
                                             <FormControlLabel
                                             key={ele[1]}
                                                sx={{
                                                   width: "25px",
                                                   height: "20px",
                                                   mr: "0px",
                                                   "& .MuiTypography-root": {
                                                      fontSize: "14px",
                                                      pr: "8px",
                                                   },
                                                }}
                                                labelPlacement="start"
                                                value={ele[1]}
                                                label={`₹${ele[1]}`}
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
                                          )
                                       )}
                                 </RadioGroup>
                              </FormControl>
                           </Grid>
                        </Grid>
                     </List>
                  </Collapse>
               </Box>
            );
         })}
      </List>
   );
}

export default CartItem;
