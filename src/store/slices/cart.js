import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   addOns: [],
   cartItems: [],
   error: "",
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart(state, action) {
         state.cartItems = [...state.cartItems, action.payload];
      },
      addVariantToCart(state, action) {
         state.cartItems = action.payload;
      },
      incrementCount(state, action) {
         state.cartItems.map((cart) => {
            if (action.payload === cart.itemId) {
               if (cart.qty < 10) {
                  cart.qty += 1;
               } else {
                  state.error = "Cart Limit Exceeded";
               }
            }
            return cart;
         });
      },
      changeVariant(state, action) {
         state.cartItems.map((cart) => {
            if (action.payload.id === cart.itemId) {
               cart.price = action.payload.price;
               cart.variant = action.payload.variant;
            }
            return cart;
         });
      },

      decrementCount(state, action) {
         const cart = state.cartItems.map((cart) => {
            if (action.payload === cart.itemId) {
               if (state.error) {
                  state.error = "";
               }
               cart.qty -= 1;
            }
            return cart;
         });
         state.cartItems = cart.filter((item) => item.qty > 0);
         if (!state.cartItems.length) state.addOns = [];
      },

      incrementVariantQty(state, action) {
         const { id, variant } = action.payload;
         const newItems = state.cartItems.map((cart) => {
            if (id === cart.itemId && variant === cart.variant) {
               cart.qty += 1;
            }
            return cart;
         });
         state.cartItems = newItems;
      },
      decrementVariantQty(state, action) {
         const { id, variant } = action.payload;
         const newItems = state.cartItems.map((cart) => {
            if (id === cart.itemId && variant === cart.variant) {
               cart.qty -= 1;
            }
            return cart;
         });
         state.cartItems = newItems.filter((item) => item.qty > 0);
      },

      clearCartItems(state) {
         state.cartItems = [];
         state.addOns = [];
      },
      addNote(state, action) {
         if (action.payload.variant) {
            state.cartItems = state.cartItems.map((item) => {
               if (
                  item.itemId === action.payload.itemId &&
                  action.payload.variant === item.variant
               ) {
                  return {
                     ...item,
                     note: action.payload.note,
                  };
               }
               return item;
            });
         } else {
            state.cartItems = state.cartItems.map((item) => {
               if (item.itemId === action.payload.itemId) {
                  return {
                     ...item,
                     note: action.payload.note,
                  };
               }
               return item;
            });
         }
      },
      addOnsAddToCart(state, action) {
         state.addOns = [...state.addOns, action.payload];
      },
      incrementAddOnsCount(state, action) {
         state.addOns?.map((item) => {
            if (action.payload === item.itemId) {
               if (item.qty < 10) {
                  item.qty += 1;
               } else {
                  state.error = "Cart Limit Exceeded";
               }
            }
            return item;
         });
      },
      decrementAddOnsCount(state, action) {
         const cart = state.addOns.map((item) => {
            if (action.payload === item.itemId) {
               if (state.error) {
                  state.error = "";
               }
               item.qty -= 1;
            }
            return item;
         });
         state.addOns = cart.filter((item) => item.qty > 0);
      },
      changeAddOnsVariant(state, action) {
         state.addOns.map((item) => {
            if (action.payload.id === item.itemId) {
               item.price = action.payload.price;
            }
            return item;
         });
      },
   },
});

export const selectCartById = (state, itemId) =>
   state.cart.cartItems?.find((cartitem) => cartitem.itemId === itemId);

export const selectAddOnCartById = (state, itemId) =>
   state.cart.addOns?.find((cartitem) => cartitem.itemId === itemId);

export const {
   addToCart,
   incrementCount,
   decrementCount,
   changeVariant,
   clearCartItems,
   addNote,
   addOnsAddToCart,
   incrementAddOnsCount,
   decrementAddOnsCount,
   changeAddOnsVariant,
   addVariantToCart,
   incrementVariantQty,
   decrementVariantQty,
} = cartSlice.actions;
export default cartSlice.reducer;
