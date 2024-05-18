import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/axios";

//Get store details using the store id
export const getAllOrders = createAsyncThunk(
   "orders/getAllOrders",
   async () => {
      try {
         const response = await API.get("/order/allOrders");
         return response.data;
      } catch (error) {
         console.log(error);
      }
   }
);
const initialState = {
   allOrders: [],
   loading: false,
   error: '',
};

const orderSlice = createSlice({
   name: "orders",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.allOrders = action.payload;
         })
         .addCase(getAllOrders.rejected, () => {});
   },
});


export default orderSlice.reducer;