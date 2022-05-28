import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressWithIdType } from '@types';
import axiosClient from '@utils/api';
import omit from 'lodash/omit';
// import debounce from 'lodash/debounce';

export type CartItemType = {
  discount?: number;
  id: string;
  name: string;
  option: {
    id: string;
    name: string;
    amount: number;
    price: number;
    images: string[];
  };
  selected: boolean;
  quantity: number;
  slug: string;
  productId: string;
};
export type Add2CartType = {
  productId: string;
  quantity: number;
  optionId: string;
};
export type RemoveItemType = {
  productId?: string;
  optionId?: string;
};
export type UpdateSelectedItemType = {
  productId?: string;
  optionId?: string;
  selected: boolean;
};
export type UpdateQuantityItemType = {
  productId?: string;
  optionId?: string;
  quantity: number;
};
export type CountCartType = {
  status: string;
  result?: { itemsCount: number; itemsQty: number };
};
export type CartState = {
  items: CartItemType[];
  count?: number;
  shippingAddress?: AddressWithIdType;
};
const initialState: CartState = {
  items: [],
  count: 0,
  shippingAddress: undefined
  // paymentType: 'COD'
};

export const getCountCart = createAsyncThunk(
  'cart/count',
  async (_, { rejectWithValue }) => {
    try {
      const cartInfo: CountCartType = await axiosClient.get('cart/count');
      return cartInfo;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const add2Cart = createAsyncThunk(
  'cart/add2Cart',
  async (data: Add2CartType, { rejectWithValue }) => {
    try {
      const cart: CartItemType & { status: string } = await axiosClient.post(
        'cart/add2cart',
        data
      );
      return cart;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async (data: RemoveItemType, { rejectWithValue }) => {
    try {
      const status: { status: string } = await axiosClient.delete(
        'cart/remove',
        {
          data
        }
      );
      return status;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateSelectedCartItem = createAsyncThunk(
  'cart/updateSelect',
  async (data: UpdateSelectedItemType, { rejectWithValue }) => {
    try {
      const result: { selected: boolean; status: string } =
        await axiosClient.patch('cart/updateSelect', data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateQuantityCartItem = createAsyncThunk(
  'cart/updateQuantity',
  async (data: UpdateQuantityItemType, { rejectWithValue }) => {
    try {
      const result: { qty?: number; status: string } = await axiosClient.patch(
        'cart/quantity',
        data
      );
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateShippingAddress = createAsyncThunk(
  'cart/updateShippingAddress',
  async (address: AddressWithIdType, { rejectWithValue }) => {
    try {
      const result: { status: string; shippingAddressId?: string } =
        await axiosClient.patch('cart/address', { addressId: address.id });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    restoreCartFromLocalStorage(state) {
      const localCart = localStorage.getItem('cart');
      const cart = localCart ? JSON.parse(localCart) : [];
      state.items = cart;
    },
    setCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.shippingAddress = action.payload.shippingAddress;
    },
    setShippingCart(state, action: PayloadAction<AddressWithIdType>) {
      state.shippingAddress = action.payload;
    },
    removeCart(state) {
      state.items = [];
    },
    setQuantityItemCart(state, action: PayloadAction<UpdateQuantityItemType>) {
      const { productId, optionId, quantity } = action.payload;
      if (!productId || !optionId) {
        return;
      }
      const index = state.items.findIndex(
        (item) => item.productId === productId && item.option.id === optionId
      );
      state.items[index].quantity = quantity;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountCart.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const { result } = action.payload;
        state.count = result?.itemsCount || 0;
      }
    });
    builder.addCase(add2Cart.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        state.items.push(omit(action.payload, ['status', 'discount']));
        state.count = state.items.length;
      }
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const { productId, optionId } = action.meta.arg;
        if (!productId && !optionId) {
          state.items = state.items.filter(
            (itemCart) => itemCart.selected === false
          ); // deleteSelectedAll
          state.count = state.items.length;
          return;
        }
        state.items = state.items.filter(
          (item) => item.productId !== productId || item.option.id !== optionId // deleteItem
        );
        state.count = state.items.length;
      }
    });
    builder.addCase(updateSelectedCartItem.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const { productId, optionId, selected } = action.meta.arg;
        if (!productId && !optionId) {
          state.items.forEach((item) => (item.selected = selected)); // updateAll
          return;
        }
        const index = state.items.findIndex(
          (item) => item.productId === productId && item.option.id === optionId // updateItem
        );
        state.items[index].selected = selected;
      }
    });
    builder.addCase(updateQuantityCartItem.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const { productId, optionId, quantity } = action.meta.arg;
        if (!productId || !optionId) {
          return;
        }
        const index = state.items.findIndex(
          (item) => item.productId === productId && item.option.id === optionId
        );
        state.items[index].quantity = quantity;
      }
    });
    builder.addCase(updateShippingAddress.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const selectedAddress: AddressWithIdType = action.meta.arg;
        state.shippingAddress = selectedAddress;
      }
    });
  }
});

export const {
  restoreCartFromLocalStorage,
  removeCart,
  setCart,
  setShippingCart,
  setQuantityItemCart
} = cartSlice.actions;
export default cartSlice.reducer;
