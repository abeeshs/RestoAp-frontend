import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/axios";

//Get store details using the store id
export const getStoreData = createAsyncThunk(
   "restaurent/getStoreData",
   async ({ storeId, tableId }) => {
      console.log({ storeId, tableId });
      try {
         const response = await API.get(
            `/customers/store/${storeId}/${tableId}`
         );
         return response.data;
      } catch (error) {
         console.log(error);
         throw error
      }
   }
);

const initialState = {
   tableId: null,
   storeId: null,
   storeDetails: {},
   tableDetails: {},
   loading: false,
   error: "",
};

const restaurentSlice = createSlice({
   name: "restaurent",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getStoreData.pending, (state) => {
            state.loading = true;
         })
         .addCase(getStoreData.fulfilled, (state, action) => {
            state.loading = false;
            state.storeDetails = action.payload.store;
            state.tableDetails = action.payload.table;
            state.tableId = action.payload.table?.id;
            state.storeId = action.payload.store?.id;
         })
         .addCase(getStoreData.rejected, (state, action) => {
            console.log(action.error);
            state.tableId=null,
            state.tableDetails=null
            state.storeId=null,
            state.storeDetails=null,
            state.loading = false;
            state.error = action.error;
         });
   },
});

export default restaurentSlice.reducer;
