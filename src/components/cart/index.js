import React from "react";
import { useSelector } from "react-redux";
import BillDetails from "./BillDetails";
import ItemsAdded from "./ItemsAdded";
import { Box } from "@mui/material";
function Cart() {
   // const [toggle, setToggleBar] = useState(false);
   //Get all cart items form redux
   const allCartItems = useSelector((state) => state.cart.cartItems);

   //Total cart count
   let cartCount = 0;
   allCartItems.map((item) => {
      return (cartCount += item.qty);
   });

   // const toggleHandle = () => setToggleBar((prev) => !prev);

   return (
      <Box height="100vh" bgcolor="#fff">
         <ItemsAdded />
         <BillDetails />
      </Box>
   );
}

export default Cart;
