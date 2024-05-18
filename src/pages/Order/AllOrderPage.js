import React, { useEffect } from "react";
import PastOrders from "../../components/order/PastOrders";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../store/slices/orders";

function AllOrderPage() {
   const dispatch =useDispatch()

   useEffect(() => {
      dispatch(getAllOrders());
   }, [dispatch]);

   return (
      <>
         <PastOrders />
      </>
   );
}

export default AllOrderPage;
