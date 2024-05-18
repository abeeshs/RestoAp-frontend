import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";

export const getCurrentOrders = createAsyncThunk(
   "currentOrder/getCurrentOrders",
   async (storeId) => {
      try {
         const response = await API.get(`/order/current-order/${storeId}`);

         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   }
);

const initialState = {
   currentOrders: [],
   loading: false,
   error: "",
};

const currentOrderSlice = createSlice({
   name: "currentOrder",
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(getCurrentOrders.pending, (state) => {
            state.loading = true;
         })
         .addCase(getCurrentOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrders = action.payload;
         })
         .addCase(getCurrentOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export default currentOrderSlice.reducer;
