import {
   Box,
   Button,
   Grid,
   IconButton,
   Typography,
   styled,
} from "@mui/material";
import React, { useState } from "react";
import CommonModal from "../../components/common/CommonModal";
import { Add, ChevronRight } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
   addNote,
   // changeAddOnsVariant,
   // changeVariant,
   // decrementAddOnsCount,
   decrementCount,
   decrementVariantQty,
   // incrementAddOnsCount,
   incrementCount,
   incrementVariantQty,
} from "../../store/slices/cart";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import SquareIcon from "../common/SquareIcon";
import PreperationTime from "../common/PreperationTime";
// import AddOnsCard from "./AddOnsCard";
// import CartFullView from "./CartFullView";

const CustomCard = styled(Box)({
   backgroundColor: "#fff",
   marginTop: "15px",
});

const DashLine = styled(Box)({
   width: "100%",
   height: "2px",
   borderBottom: "1px dashed black",
});

const CustomButton = styled(Button)({
   padding: "0 !important",
   minWidth: "100px",
   fontSize: "14px !important",
});

function ItemsAdded() {
   const navigate = useNavigate();

   //State for store the addNote item id
   const [addNoteItem, setAddNoteItem] = useState({});

   //State for show/hide varients collaps
   // const [open, setOpen] = useState([]);

   // const [itemVariant, setItemVariant] = useState({});

   //State for show/hide instrucion modal
   const [showInstruction, setShowInstruction] = useState(false);

   // Get all cart items
   const allCartItems = useSelector((state) => state.cart.cartItems);
   // Get store details from redux
   const { storeDetails } = useSelector((state) => state.restaurent);

   const dispatch = useDispatch();

   // const handleClickAddon = () => {
   //    setCollaps(!collaps);
   // };
   const handleShowAddNote = (item) => {
      setAddNoteItem(item);
      setShowInstruction(true);
   };

   //Function to handle show/hide item variants
   // const handleClick = (num) => {
   //    if (open.includes(num)) {
   //       setOpen(open.filter((item) => item !== num));
   //    } else {
   //       setOpen((prev) => [...prev, num]);
   //    }
   // };

   //Function to change the item variant
   // const handleVariantChange = (e, itemId) => {
   //    dispatch(changeVariant({ price: e.target.value, id: itemId }));
   //    setItemVariant((state) => ({ ...state, itemId: e.target.value }));
   // };

   const handleDecrement = (id, variant) => {
      variant
         ? dispatch(decrementVariantQty({ id, variant }))
         : dispatch(decrementCount(id));
   };

   //Function to handle increment the cart count
   const handleIncrement = (id, variant) => {
      variant
         ? dispatch(incrementVariantQty({ id, variant }))
         : dispatch(incrementCount(id));
   };

   const setNote = (itemId, note, variant) => {
      dispatch(addNote({ itemId, note, variant }));
      setShowInstruction(false);
   };

   return (
      <Box bgcolor="#fff">
         <Box
            sx={{
               boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
               height: "50px",
               padding: "15px",
               display: "flex",
               gap: 2,
               alignItems: "center",
            }}
         >
            <ArrowBackIosIcon onClick={() => navigate("/")} />
            <Typography fontWeight="500" fontSize="18px">
               Items Added
            </Typography>
         </Box>
         <CustomCard>
            {allCartItems?.map((item) => {
               return (
                  <Box m="10px 0px" p="0px 15px" key={item?.itemId}>
                     <Grid container mb="10px">
                        <Grid
                           item
                           xs={8}
                           // height="25px"
                           display="flex"
                           justifyContent=""
                           alignItems="center"
                        >
                           <Box display="flex" alignItems="start">
                              <Typography
                                 textAlign="center"
                                 component={"h5"}
                                 pt="5px"
                              >
                                 <SquareIcon icon="triangle" color="red" />
                              </Typography>
                              <Typography
                                 ml="6px"
                                 fontSize="16px"
                                 fontWeight="fontWeightMedium"
                                 textTransform="capitalize"
                              >
                                 {item?.name}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={4}
                           height="25px"
                           display="flex"
                           justifyContent="end"
                           alignItems="center"
                        >
                           <Box
                              display="flex"
                              justifyContent="space-between"
                              width="80px"
                           >
                              <IconButton
                                 onClick={() =>
                                    handleDecrement(item.itemId, item.variant)
                                 }
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
                                 {item?.qty}
                              </Typography>
                              <IconButton
                                 onClick={() =>
                                    handleIncrement(item.itemId, item.variant)
                                 }
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
                        </Grid>
                        <Grid item xs={6} height="25px">
                           <Box
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 width: "111px",
                                 justifyContent: "space-between",
                              }}
                           >
                              <>
                                 {/* <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",
                                       color: "#BB3138",
                                    }}
                                 /> */}
                                 <Typography
                                    fontSize="16px"
                                    fontWeight="600"
                                    color="#BB3138"
                                 >
                                    {storeDetails?.currencySymbol}
                                    {item?.price}
                                 </Typography>
                              </>
                              <PreperationTime time={item?.prepTime} />
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={6}
                           display="flex"
                           justifyContent="end"
                           alignItems="center"
                        >
                           <Box  alignItems="center">
                              {/* <CurrencyRupeeIcon
                                 sx={{
                                    fontSize: "15px",
                                    color: "#BB3138",
                                 }}
                              /> */}
                              <Typography
                                 fontSize="16px"
                                 fontWeight="600"
                                 color="#BB3138"
                              >
                                 {storeDetails?.currencySymbol}
                                 {(item?.price * item?.qty).toFixed(2)}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid item xs={4} height="25px">
                           <Typography fontSize="14px">Full</Typography>
                        </Grid>
                        <Grid
                           item
                           xs={8}
                           display="flex"
                           alignItems="center"
                           justifyContent="end"
                        >
                           <Box display="flex" alignItems="center">
                              <Add
                                 sx={{
                                    fontSize: "14px !important",
                                    fontWeight: "900",
                                    textAlign: "center",
                                    color: "#BB3138",
                                 }}
                              />
                              <CustomButton
                                 onClick={() => handleShowAddNote(item)}
                              >
                                 <span style={{ marginRight: "5px" }}></span>
                                 <u fontSize="14px">
                                    {item?.note
                                       ? item.note.slice(0, 11) + "..."
                                       : "Add Instructions"}
                                 </u>
                              </CustomButton>
                           </Box>
                        </Grid>
                        {/* {item?.variants && item?.variants.length > 0 && (
                           <Grid item xs={12} height="25px">
                              <Box
                                 display="flex"
                                 width="60px"
                                 justifyContent="space-between"
                                 color="#BB3138"
                                 fontWeight="500"
                              >
                                 <Typography width="10px" fontSize="14px">
                                    Edit
                                 </Typography>
                                 <KeyboardArrowDown
                                    onClick={() => handleClick(item.itemId)}
                                    sx={{
                                       fontSize: "18px",
                                    }}
                                 />
                              </Box>
                           </Grid>
                        )} */}
                     </Grid>
                     {/* <Collapse
                        in={open.includes(item?.itemId)}
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
                                    item?.variants?.map((e) => (
                                       <Typography
                                          key={e._id}
                                          fontSize="12px"
                                          textTransform="capitalize"
                                       >
                                          {e.name}
                                       </Typography>
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
                                       defaultValue={item?.price ?? ""}
                                       value={itemVariant[item.itemId]}
                                    >
                                       {item?.variants &&
                                          item.variants?.map((ele) => (
                                             <FormControlLabel
                                                key={ele._id}
                                                sx={{
                                                   width: "25px",
                                                   height: "20px",
                                                   mr: "0px",
                                                   "& .MuiTypography-root": {
                                                      fontSize: "12px",
                                                      pr: "8px",
                                                   },
                                                }}
                                                labelPlacement="start"
                                                value={ele.price}
                                                label={`₹${ele.price}`}
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
                                 </FormControl>
                              </Grid>
                           </Grid>
                        </List>
                     </Collapse> */}
                     <DashLine />
                  </Box>
               );
            })}

            {/* ====== section for addons items which is added to cart======= */}

            {/* {addOns?.map((item) => {
               return (
                  <Box m="10px 0px" p="0px 15px" key={item?._id}>
                     <Grid container mb="10px">
                        <Grid
                           item
                           xs={8}
                           height="25px"
                           display="flex"
                           justifyContent=""
                           alignItems="center"
                        >
                           <Box display="flex" alignItems="center">
                              <Typography textAlign="center" component={"h5"}>
                                 <SquareIcon icon="triangle" color="red" />
                              </Typography>
                              <Typography
                                 ml="6px"
                                 fontSize="16px"
                                 fontWeight="fontWeightMedium"
                                 textTransform="capitalize"
                              >
                                 {item?.name}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={4}
                           height="25px"
                           display="flex"
                           justifyContent="end"
                           alignItems="center"
                        >
                           <Box
                              display="flex"
                              justifyContent="space-between"
                              width="80px"
                           >
                              <IconButton
                                 onClick={() =>
                                    handleAddOnDecrement(item.itemId)
                                 }
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
                                 {item?.qty}
                              </Typography>
                              <IconButton
                                 onClick={() =>
                                    handleAddOnIncrement(item.itemId)
                                 }
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
                        </Grid>
                        <Grid item xs={6} height="25px">
                           <Box
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 width: "40px",
                                 justifyContent: "space-between",
                              }}
                           >
                              <>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",
                                       color: "#BB3138",
                                    }}
                                 />
                                 <Typography
                                    fontSize="16px"
                                    fontWeight="600"
                                    color="#BB3138"
                                 >
                                    {item?.price}
                                 </Typography>
                              </>
                              <PreperationTime time={item?.prepTime} />
                           </Box>
                        </Grid>
                        <Grid
                           item
                           xs={6}
                           display="flex"
                           justifyContent="end"
                           alignItems="center"
                        >
                           <Box display="flex" alignItems="center">
                              <CurrencyRupeeIcon
                                 sx={{
                                    fontSize: "15px",
                                    color: "#BB3138",
                                 }}
                              />
                              <Typography
                                 fontSize="16px"
                                 fontWeight="600"
                                 color="#BB3138"
                              >
                                 {item?.price * item?.qty}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid item xs={4} height="25px">
                           <Typography fontSize="14px">Full</Typography>
                        </Grid>
                        <Grid
                           item
                           xs={8}
                           display="flex"
                           alignItems="center"
                           justifyContent="end"
                        ></Grid>
                        {item?.variants && item?.variants.length > 0 && (
                           <Grid item xs={12} height="25px">
                              <Box
                                 display="flex"
                                 width="60px"
                                 justifyContent="space-between"
                                 color="#BB3138"
                                 fontWeight="500"
                              >
                                 <Typography width="10px" fontSize="14px">
                                    Edit
                                 </Typography>
                                 <KeyboardArrowDown
                                    onClick={() => handleClick(item.itemId)}
                                    sx={{
                                       fontSize: "18px",
                                    }}
                                 />
                              </Box>
                           </Grid>
                        )}
                     </Grid>
                     <Collapse
                        in={open.includes(item?.itemId)}
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
                                    item?.variants?.map((e) => (
                                       <Typography
                                          key={e._id}
                                          fontSize="12px"
                                          textTransform="capitalize"
                                       >
                                          {e.name}
                                       </Typography>
                                    ))}
                              </Grid>
                              <Grid item xs={6} textAlign="end">
                                 <FormControl fontSize="12px">
                                    <RadioGroup
                                       aria-labelledby="demo-radio-buttons-group-label"
                                       name="radio-buttons-group"
                                       onChange={(e) =>
                                          handleAddOnsVariantChange(
                                             e,
                                             item.itemId
                                          )
                                       }
                                       defaultValue={item?.price ?? ""}
                                       value={itemVariant[item.itemId]}
                                    >
                                       {item?.variants &&
                                          item.variants?.map((ele) => (
                                             <FormControlLabel
                                                key={ele._id}
                                                sx={{
                                                   width: "25px",
                                                   height: "20px",
                                                   mr: "0px",
                                                   "& .MuiTypography-root": {
                                                      fontSize: "12px",
                                                      pr: "8px",
                                                   },
                                                }}
                                                labelPlacement="start"
                                                value={ele.price}
                                                label={`₹${ele.price}`}
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
                                 </FormControl>
                              </Grid>
                           </Grid>
                        </List>
                     </Collapse>
                     <DashLine />
                  </Box>
               );
            })} */}

            <Box
               onClick={() => navigate("/")}
               sx={{
                  display: "flex",
                  alignItems: "center",
                  m: "10px 15px 0px 15px",
                  pb: "10px",
                  borderBottom: "1px dashed black",
               }}
            >
               <Box
                  sx={{
                     width: "70%",
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  <Add
                     sx={{
                        color: "#BB3138",
                        fontSize: "20px",
                        mr: "6px",
                        fontWeight: "bold",
                     }}
                  />

                  <Typography fontWeight="500" fontSize="16px">
                     Add More Items
                  </Typography>
               </Box>
               <Box width="50%" display="flex" justifyContent="end">
                  <ChevronRight />
               </Box>
            </Box>
            {/* ======= Section to display all releated Addons items======= */}

            {/* {addons && addons.length > 0 && (
               <Box
                  sx={{
                     width: "100%",
                     height: "209px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     pl:"15px"
                  }}
               >
                  <Box
                     sx={{
                       
                        display: "flex",
                        height:"40px",
                        alignItems: "center",
                        mt:"4px"
                     }}
                  >
                     <Typography fontWeight="500" fontSize="18px">
                        Add Ons
                     </Typography>
                  </Box>
                  <OfferContanerBox>
                     {addons?.map((item, index) => (
                        <AddOnsCard
                           key={index._id}
                           item={item}
                           handleVariant={handleVariant}
                           openExpandCart={openExpandCart}
                        />
                        
                     ))}
                  </OfferContanerBox>
               </Box>
            )} */}
         </CustomCard>
         <CommonModal open={showInstruction} color="transparent">
            <AddNote
               item={addNoteItem}
               setItem={setAddNoteItem}
               setNote={setNote}
               setShowInstruction={setShowInstruction}
            />
         </CommonModal>
         {/* {currentCartItemId && (
            <CartFullView
               open={toggle}
               closeExpandCart={closeExpapndCart}
               itemId={currentCartItemId}
            />
         )} */}
      </Box>
   );
}

export default ItemsAdded;
