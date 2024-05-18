import styled from "@emotion/styled";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";

const CustomList = styled(ListItem)({
   padding: "0px 15px 2px",
   fontSize: "14px",
});

const ListItems = ({ text, amount,col }) => {
   return (
      <CustomList
         secondaryAction={
            <Typography fontSize="14px" edge="end" aria-label="delete" color={col}>
               {amount}
            </Typography>
         }
      >
         {text}
      </CustomList>
   );
};

function BillDetailSection({ order }) {
   const { charges } = order;
   const gst = charges?.tax > 0 ? charges?.tax / 2 : null;

   return (
      <Box bgcolor="#fff" mt="-5px">
         <Box width="100%" height="40px" p="15px">
            <Typography fontSize="18px" fontWeight="500">
               Bill Details
            </Typography>
         </Box>
         <Box
            sx={{
               borderRadius: "25px",
               bgcolor: "#fff",
               width: "100%",
            }}
         >
            <List>
               <ListItem
                  sx={{
                     fontSize: "16px",
                     fontWeight: 500,
                  }}
                  secondaryAction={
                     <Typography
                        fontSize="16px"
                        fontWeight="500"
                        edge="end"
                        aria-label="delete"
                     >
                        { order?.subtotalBillAmount}
                     </Typography>
                  }
               >
                  Total Amount (Before Tax)
               </ListItem>
               {gst && (
                  <>
                     <ListItems text="SGST @ 2.5 %" amount={gst.toFixed(2)} />
                     <ListItems text="CGST @ 2.5 %" amount={gst.toFixed(2)} />
                  </>
               )}
               {charges?.parcelCharge > 0 && (
                  <ListItems
                     text={`Parcel Charge`}
                     amount={charges?.parcelCharge}
                  />
               )}

               <ListItems
                  text={`Aditional Amount (${charges?.additionalCharge.name})`}
                  amount={charges?.additionalCharge?.amount}
               />
               <ListItems
                  text="Gross Amount"
                  amount={order?.grossAmount.toFixed(2)}
               />
              
               <ListItems
                  text="Rounded"
                  amount={order?.roundoffAmount.toFixed(2)}
               />
               <ListItem
                  sx={{
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
                        {order?.finalBillAmount}
                     </Typography>
                  }
               >
                  Grand Total
                  <Divider />
               </ListItem>
               {order?.payment?.status === "success" && (
                  <ListItem
                     sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        borderTop: "1px solid #EFEFEF",
                        color: "#22ba18",
                     }}
                     secondaryAction={
                        <Typography
                           fontSize="14px"
                           fontWeight="600"
                           edge="end"
                           aria-label="delete"
                        >
                           {Math.floor(order?.totalAmount)}
                        </Typography>
                     }
                  >
                     {order?.paymentType === "Cash"
                        ? "Paid Via cash"
                        : "Paid Via Online"}
                  </ListItem>
               )}
            </List>
         </Box>
      </Box>
   );
}

export default BillDetailSection;
