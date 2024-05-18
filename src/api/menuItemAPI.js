import API from "../config/axios";

export const getMenuItemById = async (storeId, itemId) => {
   try {
      const response = await API.get(
         `/customers/menuItems/item/${storeId}/${itemId}`
      );
      return response.data;
   } catch (err) {
      console.log(err);
   }
};
