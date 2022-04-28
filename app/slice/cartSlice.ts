import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { save2localStorage } from '@utils/cart';
import { isServer } from '@utils/misc';

const initialState = {
  listProduct: []
  // address_shipping: null,
  // paymentType: 'COD'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    restoreCartFromLocalStorage(state) {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      state.listProduct = localCart;
    },
    add2Cart(state, action: PayloadAction<any>) {
      save2localStorage(action.payload);
      const indexProduct = state.listProduct.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.option.id === action.payload.option.id
      );
      if (indexProduct === -1) {
        state.listProduct.push(action.payload);
        return;
      }
      state.listProduct[indexProduct].quantity = action.payload.quantity;
    },
    removeCart(state) {
      state.listProduct = [];
    }
  }
});

export const { add2Cart, restoreCartFromLocalStorage, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
