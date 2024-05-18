import API from "../config/axios";

export const searchItems = async (storeId, searchText) => {
   try {
      const response = await API.get(
         `/customers/menuItems/search/${storeId}/?text=${searchText}`
      );
      return response.data;
   } catch (err) {
      console.log(err);
   }
};
