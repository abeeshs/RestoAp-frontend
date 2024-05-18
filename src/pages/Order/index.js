import React, { useState } from "react";
import Order from "../../components/order";
import { Box } from "@mui/material";
// import OrderPlaced from "../../components/order/OrderPlaced";

function OrderPage() {
   const [showFlashScreen, setShowFlashScreen] = useState(true);

   if (showFlashScreen) setTimeout(() => setShowFlashScreen(false), 2000);

   return (
      <Box height="100vh" bgcolor="#fff">
         {/* {showFlashScreen ? <OrderPlaced />: <Order />} */}
        <Order />
      </Box>
   );
}

export default OrderPage;
