import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";

export const getAllMenu = createAsyncThunk(
   "menu/getAllMenu",
   async (storeId) => {
      try {
         const response = await API.get(`/customers/menuItems/${storeId}`);
         return response.data;
      } catch (err) {
         console.log(err);
      }
   }
);

const initialState = {
   menuItems: [],
   loading: false,
   error: "",
};

const menuSlice = createSlice({
   name: "menu",
   initialState,
   reducers: {
      getMenuSuccess(state, action) {
         state.menuItems = action.payload;
      },
      getMenuItems() {},
      getMenuItemFailure() {},
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllMenu.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllMenu.fulfilled, (state, action) => {
            state.loading = false;
            state.menuItems = action.payload;
         })
         .addCase(getAllMenu.rejected, () => {});
   },
});

export const { getMenuSuccess, getMenuItems, getMenuItemFailure } =
   menuSlice.actions;
export default menuSlice.reducer;
