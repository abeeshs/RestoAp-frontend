import React, { useEffect, useState } from "react";
import ItemImageSection from "./ItemImageSection";
import ItemDescription from "./ItemDescription";
import ItemVideoSection from "./ItemVideoSection";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMenuItemById } from "../../api/menuItemAPI";
import { useSelector } from "react-redux";
import CartFullView from "../cart/CartFullView";
import ItemDetailPageSkeleton from "../skeleton/ItemDetailPageSkeleton";

function MenuItemView() {
   const { id } = useParams();
   const storeId = useSelector((state) => state.restaurent.storeId);
   // const [currentCartItem, setCurrentCartItem] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [currentItem, setCurrentItem] = useState({});
   const [toggle, setToggleBar] = useState(false);

   const getSingleMenuItem = async () => {
      setIsLoading(true);
      const result = await getMenuItemById(storeId, id);
      setIsLoading(false);
      setCurrentItem(result);
   };



   useEffect(() => {
      getSingleMenuItem(storeId, id);
      // eslint-disable-next-line
   }, [storeId, id]);
   console.log({ id });

   const openExpandCart = () => setToggleBar(true);
   const closeExpapndCart = () => setToggleBar(false);

   if (isLoading) return <ItemDetailPageSkeleton />;
   return (
      <Box bgcolor="#fff" height="100vh">
         <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="#fff"
         >
            <ItemImageSection currentItem={currentItem} />

            <ItemDescription
               currentItem={currentItem}
               openExpandCart={openExpandCart}
            />

            {currentItem && currentItem?.videos?.length > 0 && (
               <ItemVideoSection currentItem={currentItem} />
            )}
         </Box>
         {toggle && (
            <CartFullView
               open={toggle}
               closeExpandCart={closeExpapndCart}
               item={currentItem}
            />
         )}
      </Box>
   );
}

export default MenuItemView;
