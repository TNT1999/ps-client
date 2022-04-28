import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { save2localStorage } from '@utils/cart';
import { isServer } from '@utils/misc';

export type CartItem = {
  discount: number;
  id: string;
  name: string;
  option: {
    id: string;
    name: string;
    amount: number;
    price: number;
    images: string[];
  };
  quantity: number;
  slug: string;
};
const initialState: { listProduct: CartItem[] } = {
  listProduct: []
  // address_shipping: null,
  // paymentType: 'COD'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    restoreCartFromLocalStorage(state) {
      const localCart = localStorage.getItem('cart');
      const cart = localCart ? JSON.parse(localCart) : [];
      state.listProduct = cart;
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
