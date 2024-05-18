import API from "../config/axios";
         // storeId, tableId, items, addons, orderType

export const placeOrder = async (storeId,tableId, items,addOns,orderType) => {
   try {
      const response = await API.post('/order', {
         orderType,
         storeId,
         items,
         addOns,
         tableId,
      });
      return response.data;
   } catch (err) {
      console.log(err);
      return null
   }
};


export const getCurrentOrder =async(storeId)=>{
   try{
      const response = await API.get(`/order/current-order/${storeId}`)
   
      return response.data
   }
   catch(err){
      console.log(err)
   }
}