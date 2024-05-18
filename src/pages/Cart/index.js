import React from "react";
import { useSelector } from "react-redux";
import CartEmpty from "../../components/emptyPages.js/CartEmpty";
import Cart from "../../components/cart"

function CartPage() {
   const {cartItems,addOns} = useSelector((state) => state.cart);

   //Total cart count
   let cartCount = 0;
   cartItems?.map((item) => {
      return (cartCount += item.qty);
   });
   if (addOns.length) {
      addOns?.map((item) => {
         return (cartCount += item.qty);
      });
   }

   if (cartCount === 0) return <CartEmpty />;
   return (
      <>
         <Cart/>
      </>
   );
}

export default CartPage;
