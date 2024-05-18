import { Box, Grid, List, ListItem, Typography, styled } from "@mui/material";
import React from "react";
import CommonItemName from "../common/CommonItemName";
import OrderDetailBottom from "./OrderDetailBottom";
import { useLocation } from "react-router-dom";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";

const YourOrderBox = styled(Box)({
   borderRadius: "25px 25px 0px 0px",
   backgroundColor: "#fff",
   padding: "0px 15px 0px",
   marginTop: "15px",
});

const DashedLine = styled(Box)({
   width: "100%",
   height: "10px",
   borderBottom: "1px dashed #212121",
});

const BillDetailBox = styled(Box)({
   width: "100%",
});
const CustomList = styled(ListItem)({
   padding: "0px 15px 2px",
   fontSize: "14px",
});

const ListItems = ({ text, amount }) => {
   return (
      <CustomList
         secondaryAction={
            <Typography fontSize="14px" edge="end" aria-label="delete">
               {amount}
            </Typography>
         }
      >
         {text}
      </CustomList>
   );
};
function OrderSummary() {
   let { state } = useLocation();
   const order = state.order;
   const { storeDetails } = useSelector((state) => state.restaurent);

   const { charges } = order;
   const gst = charges?.tax / 2;
   const { subOrders } = order;
   const allOrders = subOrders.flatMap((item) =>
      item.orderItems.concat(item.addons)
   );

   // const additional = order.items.filter((item) => item.isAdditional);

   return (
      <>
         <Box bgcolor="#fff">
            <Box
               width="100%"
               height="60px"
               p="15px"
               boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
            >
               <Typography fontWeight="500" fontSize="18px">
                  Order Summary
               </Typography>
            </Box>
            <YourOrderBox>
               {/* <Box mt="10px">
                  <Typography fontSize="18px" fontWeight="500">
                     Your Order
                  </Typography>
               </Box> */}
               {allOrders?.map((item) => (
                  <Box mt="10px" key={item?._id}>
                     <Grid container>
                        <Grid item xs={8}>
                           <CommonItemName name={item?.name} />
                           <Typography
                              fontSize="16px"
                              fontWeight="600"
                              color="#BB3138"
                           >
                              {storeDetails?.currencySymbol}
                              {item?.finalPrice / item?.quantity}
                           </Typography>
                        </Grid>
                        <Grid item xs={2}>
                           <Typography fontSize="16px">
                              {item?.quantity}
                           </Typography>
                        </Grid>
                        <Grid item xs={2} display="flex" justifyContent="end">
                           <Typography
                              fontSize="16px"
                              color="#BB3138"
                              fontWeight="600"
                           >
                              {storeDetails?.currencySymbol}
                              {item.finalPrice.toFixed(2)}
                           </Typography>
                        </Grid>
                     </Grid>
                  </Box>
               ))}
               {/* {additional.length > 0 && (
                  <>
                     <DashedLine />
                     <Box mt="10px">
                        <Typography fontSize="18px" fontWeight="600">
                           Additional Orders
                        </Typography>
                     </Box>
                  </>
               )} */}

               {/* {additional.map((item) => (
                  <Box mt="10px" key={item?._id}>
                     <Grid container>
                        <Grid item xs={8}>
                           <CommonItemName name={item?.name} />
                           <Typography
                              fontSize="16px"
                              color="#BB3138"
                              fontWeight="600"
                           >
                              <span>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",

                                       color: "#BB3138",
                                    }}
                                 />
                              </span>
                              {item?.price}
                           </Typography>
                        </Grid>
                        <Grid item xs={2}>
                           <Typography fontSize="16px">{item?.qty}</Typography>
                        </Grid>
                        <Grid item xs={2} display="flex" justifyContent="end">
                           <Typography
                              fontSize="16px"
                              color="#BB3138"
                              fontWeight="600"
                           >
                              <span>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",

                                       color: "#BB3138",
                                    }}
                                 />
                              </span>
                              {item?.price * item?.qty}
                           </Typography>
                        </Grid>
                     </Grid>
                  </Box>
               ))} */}
               <DashedLine />
               {/* {order?.addOns.length > 0 && (
                  <Box mt="10px">
                     <Typography fontSize="18px" fontWeight="600">
                        Add Ons
                     </Typography>
                  </Box>
               )} */}

               {/* {order?.addOns.map((item) => (
                  <Box mt="10px" key={item?._id}>
                     <Grid container>
                        <Grid item xs={8}>
                           <CommonItemName name={item?.name} />
                           <Typography
                              fontSize="16px"
                              color="#BB3138"
                              fontWeight="600"
                           >
                              <span>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",

                                       color: "#BB3138",
                                    }}
                                 />
                              </span>
                              {item?.price}
                           </Typography>
                        </Grid>
                        <Grid item xs={2}>
                           <Typography fontSize="16px">{item?.qty}</Typography>
                        </Grid>
                        <Grid item xs={2} display="flex" justifyContent="end">
                           <Typography
                              fontSize="16px"
                              color="#BB3138"
                              fontWeight="600"
                           >
                              <span>
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",

                                       color: "#BB3138",
                                    }}
                                 />
                              </span>{" "}
                              {item?.price * item?.qty}
                           </Typography>
                        </Grid>
                     </Grid>
                  </Box>
               ))} */}
            </YourOrderBox>
            <BillDetailBox bgcolor="#fff" borderRadius="0px 0px 25px 25px">
               <List>
                  <ListItem
                     sx={{
                        padding: "0px 15px 2px",
                        fontSize: "16px",
                        fontWeight: 600,
                     }}
                     secondaryAction={
                        <Typography
                           fontSize="16px"
                           fontWeight="600"
                           edge="end"
                           aria-label="delete"
                        >
                           {order?.subtotalBillAmount}
                        </Typography>
                     }
                  >
                     Total Amount (Before Tax)
                  </ListItem>
                  {charges?.tax > 0 && (
                     <>
                        <ListItems text="SGST @ 2.5 %" amount={gst} />
                        <ListItems text="CGST @ 2.5 %" amount={gst} />
                     </>
                  )}

                  <ListItems
                     text={`Additional Amount (${charges?.additionalCharge?.name})`}
                     amount={charges?.additionalCharge?.amount}
                  />
                  {charges?.parcelCharge > 0 && (
                     <ListItems
                        text={`Parcel Charges`}
                        amount={charges?.parcelCharge}
                     />
                  )}
                  <ListItems
                     text="Gross Amount"
                     amount={order?.grossAmount.toFixed(2)}
                  />
                  <ListItems text="Rounded" amount={order?.roundoffAmount} />
                  <ListItem
                     sx={{
                        padding: "2px 15px 0px",
                        fontSize: "16px",
                        fontWeight: 600,
                     }}
                     secondaryAction={
                        <Typography
                           fontSize="16px"
                           fontWeight="600"
                           edge="end"
                           aria-label="delete"
                        >
                           {Math.floor(order?.finalBillAmount)}
                        </Typography>
                     }
                  >
                     Grand Total
                  </ListItem>
               </List>
            </BillDetailBox>
         </Box>
         <OrderDetailBottom order={order} />
      </>
   );
}

export default OrderSummary;
