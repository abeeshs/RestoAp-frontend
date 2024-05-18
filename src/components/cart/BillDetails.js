import { Box, Button, List, ListItem, Typography, styled } from "@mui/material";
import React from "react";
import BottomNavbar from "../common/BottomNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../api/orderAPI";
import { clearCartItems } from "../../store/slices/cart";
import { useState } from "react";
import LoadingPage from "../../components/common/LoadingPage";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { toast, Toaster } from "react-hot-toast";

const CustomCard = styled(Box)({
   backgroundColor: "#fff",
   marginBottom: "100px",
});
const CustomList = styled(ListItem)({
   fontSize: "14px",
   textTransform: "capitalize",
   backgroundColor: "#fff",
   padding: "0px",
});

const PlaceOrderButton = styled(Button)({
   backgroundColor: "#fff",
   fontSize: "18px !important",
   fontWeight: 500,
   padding: "2px 8px",
   ":hover": {
      backgroundColor: "#fff",
   },
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

function BillDetails() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //State for loading screen
   const [isLoading, setIsLoading] = useState(false);

   //Get store id ,table id , cart items from store
   const tableId = useSelector((state) => state.restaurent.tableId);
   const storeId = useSelector((state) => state.restaurent.storeId);
   const allCartItems = useSelector((state) => state.cart.cartItems);
   const addOns = useSelector((state) => state.cart.addOns);
   const { orderType } = useSelector((state) => state.orderType);

   const isAuthenticated = useSelector((state) => state?.user.isAuthenticated);
   const tableDetails = useSelector((state) => state.restaurent.tableDetails);
   const { storeDetails } = useSelector((state) => state.restaurent);

   console.log({ tableDetails });

   const dineCategory = tableDetails?.dineCategory;
   console.log({ dineCategory });
   const { additionalCharge, name } = dineCategory;

   //Only returning required fileds to place an order
   const filterItems = () => {
      const items = allCartItems.map((item) => ({
         itemId: item.itemId,
         quantity: item.qty,
         variant: item.variant || null,
         note: item.note,
      }));
      const addons = addOns?.map((item) => ({
         itemId: item.itemId,
         quantity: item.qty,
      }));

      return { items, addons };
   };
   //

   // Function to calculate total amount
   const calculateTotal = (cartItems) =>
      cartItems.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);

   //Calling calculateTotal function
   let total;
   if (allCartItems.length > 0) {
      total = calculateTotal(allCartItems);
   }
   if (addOns.length > 0) {
      total = calculateTotal(addOns);
   }

   //Function to handle place order
   const handlePlaceOrder = async () => {
      try {
         setIsLoading(true);
         const { items, addOns } = filterItems();

         // storeId, tableId, items, addons, orderType
         const response = await placeOrder(
            storeId,
            tableId,
            items,
            addOns,
            orderType
         );
         setIsLoading(false);
         if (response) {
            await dispatch(clearCartItems());
            // setTimeout(() => dispatch(clearCartItems()), 500);
            navigate("/order");
         } else {
            setIsLoading(false);
            toast.error("Something went wrong");
         }
      } catch (err) {
         console.log(err);
         toast.error("Something went wrong");
      }
   };

   // Function to handle gross amount of the items
   const calculateGrossAmount = (getTaxexcludedTotal) => {
      //Find subTotal of tax excluded items
      const taxExcludeSubTotal = allCartItems.reduce((acc, item) => {
         const taxInclude = item?.taxInclude;
         if (!taxInclude) {
            return acc + Number(item.price) * item.qty;
         }
         return acc;
      }, 0);

      // If this function called only for get the tax excluded subtotal the return that amount
      if (getTaxexcludedTotal) return taxExcludeSubTotal;
      console.log({ taxExcludeSubTotal });

      // Calculate GST total
      const gstSubTotal = storeDetails?.taxRate
         ? (taxExcludeSubTotal * storeDetails?.taxRate) / 100
         : 0;

      // Parcel charge
      const parcelCharge = storeDetails?.parcelCharge;
      console.log({ parcelCharge });

      //Calculate additional charge amount
      const additionalChargeResult = (total * additionalCharge) / 100 || 0;

      //Add additional charge with tax excluded subtotal
      const subTotalWithAdditionalCharge = total + additionalChargeResult;
      console.log({ subTotalWithAdditionalCharge });

      console.log(gstSubTotal);

      let gross = subTotalWithAdditionalCharge + gstSubTotal;
      console.log(gross);
      // If the order type is takeaway and the store has parcel charge
      if (parcelCharge && orderType === "take_away") {
         gross += (total * parcelCharge) / 100;
         console.log(gross);
      }

      return gross;
   };

   const getFinalTotal = () => {
      const totalAmount = calculateGrossAmount();
      console.log({ totalAmount });
      const beforeRoundOff = totalAmount.toFixed(2);
      console.log({ beforeRoundOff });
      const afterRoundOff = Number(beforeRoundOff).toFixed(0);
      return afterRoundOff;
   };

   if (isLoading) return <LoadingPage />;

   return (
      <>
         <Box
            sx={{
               paddingBottom: "60px",
               backgroundColor: "white",
               padding: "15px",
            }}
         >
            <Toaster />
            <Box>
               <Typography fontWeight="500" fontSize="18px">
                  Bill Details
               </Typography>
            </Box>
            <CustomCard>
               <List>
                  <ListItem
                     sx={{
                        padding: "0px",
                        fontSize: "16px",
                        fontWeight: 700,
                     }}
                     secondaryAction={
                        <Typography
                           fontSize="16px"
                           fontWeight="700"
                           edge="end"
                           aria-label="delete"
                        >
                           {total.toFixed(2)}
                        </Typography>
                     }
                  >
                     Total Amount (Before Tax)
                  </ListItem>
                  {storeDetails?.taxRate > 0 &&
                     calculateGrossAmount(true) > 0 && (
                        <>
                           <ListItems
                              text={`SGST @ ${storeDetails.taxRate / 2} %`}
                              amount={(
                                 (calculateGrossAmount(true) *
                                    (storeDetails.taxRate / 2)) /
                                 100
                              ).toFixed(2)}
                           />
                           <ListItems
                              text={`CGST @ ${storeDetails.taxRate / 2} %`}
                              amount={(
                                 (calculateGrossAmount(true) *
                                    (storeDetails.taxRate / 2)) /
                                 100
                              ).toFixed(2)}
                           />
                        </>
                     )}

                  <ListItems
                     text={`Additional Amount (${name})`}
                     amount={((total * additionalCharge) / 100).toFixed(2)}
                  />
                  {orderType === "take_away" &&
                     storeDetails?.parcelCharge !== 0 && (
                        <ListItems
                           text={`Parcel Charge`}
                           amount={(
                              (total * storeDetails?.parcelCharge) /
                              100
                           ).toFixed(2)}
                        />
                     )}
                  <ListItems
                     text="Gross Amount"
                     amount={calculateGrossAmount().toFixed(2)}
                  />
                  <ListItems
                     text="Rounded"
                     amount={(
                        calculateGrossAmount().toFixed(0) -
                        calculateGrossAmount()
                     ).toFixed(2)}
                  />
                  <ListItem
                     sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        padding: "0px",
                     }}
                     secondaryAction={
                        <Typography
                           fontSize="16px"
                           fontWeight="600"
                           edge="end"
                           aria-label="delete"
                        >
                           {getFinalTotal()}
                        </Typography>
                     }
                  >
                     Grand Total
                  </ListItem>
               </List>
            </CustomCard>
            <BottomNavbar>
               <Box
                  width="100%"
                  height="55px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderRadius="20px"
                  backgroundColor="#BB3138"
                  padding="15px"
                  margin="5px"
               >
                  <Box>
                     <Typography fontSize="14px" color="#fff" fontWeight="500">
                        Total Amount
                     </Typography>
                     <Box alignItems="center">
                        {/* <CurrencyRupeeIcon
                           sx={{
                              fontSize: "18px",
                              color: "#fff",
                           }}
                        /> */}
                        <Typography
                           fontSize="18px"
                           color="#fff"
                           fontWeight="600"
                        >
                           {storeDetails?.currencySymbol}
                           {getFinalTotal()}
                        </Typography>
                     </Box>
                  </Box>
                  <PlaceOrderButton
                     onClick={() =>
                        isAuthenticated
                           ? handlePlaceOrder()
                           : navigate("/auth/sign-in")
                     }
                  >
                     Place Order
                  </PlaceOrderButton>
               </Box>
            </BottomNavbar>
         </Box>
      </>
   );
}

export default BillDetails;
