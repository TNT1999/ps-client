import { RootState } from '@app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@utils/api';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { CommentType, DetailProductType, ProductType } from '@types';

type Filter = {
  price: string[];
  brand: string[];
  ram: string[];
  storage: string[];
  display: string[];
};

type Search = {
  keyword: string;
  searchProducts: string[];
};
interface HomeState {
  product: ProductType[];
  filter: Filter;
  selectedProduct: DetailProductType;
  search: Search;
}

const initialState = {
  product: [],
  filter: {
    brand: [],
    price: [],
    ram: [],
    storage: [],
    display: []
  },
  selectedProduct: null,
  search: {
    keyword: null,
    searchProducts: []
  }
} as unknown as HomeState;

type FilterStore = {
  brand: string;
  ram: string;
};

export const postComment = createAsyncThunk(
  'product/postComment',
  async (data: any, { rejectWithValue }) => {
    try {
      const comment: CommentType = await axiosClient.post('/comment', data);
      return comment;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setListHomeProduct(state, action: PayloadAction<ProductType[]>) {
      state.product = action.payload;
    },
    setFilter(state, action: PayloadAction<any>) {
      for (const key of Object.keys(state.filter) as Array<
        keyof typeof state.filter
      >) {
        if (action.payload[key]) {
          state.filter[key] = action.payload[key];
        }
      }
    },
    setFilterBrand(state, action: PayloadAction<string[] | string>) {
      if (Array.isArray(action.payload)) {
        state.filter.brand = action.payload;
        return;
      }
      if (state.filter.brand.includes(action.payload)) {
        state.filter.brand = state.filter.brand.filter(
          (brand) => brand != action.payload
        );
        return;
      }
      state.filter.brand.push(action.payload);
    },
    setFilterRam(state, action: PayloadAction<string[] | string>) {
      if (Array.isArray(action.payload)) {
        state.filter.ram = action.payload;
        return;
      }
      if (state.filter.ram.includes(action.payload)) {
        state.filter.ram = state.filter.ram.filter(
          (ram) => ram != action.payload
        );
        return;
      }
      state.filter.ram.push(action.payload);
    },
    setFilterStorage(state, action: PayloadAction<string[] | string>) {
      if (Array.isArray(action.payload)) {
        state.filter.storage = action.payload;
        return;
      }
      if (state.filter.storage.includes(action.payload)) {
        state.filter.storage = state.filter.storage.filter(
          (storage) => storage != action.payload
        );
        return;
      }
      state.filter.storage.push(action.payload);
    },
    setFilterDisplay(state, action: PayloadAction<string[] | string>) {
      if (Array.isArray(action.payload)) {
        state.filter.display = action.payload;
        return;
      }
      if (state.filter.display.includes(action.payload)) {
        state.filter.display = state.filter.display.filter(
          (display) => display != action.payload
        );
        return;
      }
      state.filter.display.push(action.payload);
    },
    setFilterPrice(state, action: PayloadAction<string[] | string>) {
      if (Array.isArray(action.payload)) {
        state.filter.price = action.payload;
        return;
      }
      if (state.filter.price.includes(action.payload)) {
        state.filter.price = state.filter.price.filter(
          (price) => price != action.payload
        );
        return;
      }
      state.filter.price.push(action.payload);
    },

    setSelectedProduct(state, action: PayloadAction<DetailProductType>) {
      state.selectedProduct = action.payload;
    },
    setSearch(state, action: PayloadAction<any>) {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postComment.fulfilled, (state, action) => {
      const comment = action.payload;
      const { replyToCommentId: isReply, rootCommentId } = comment;
      if (!state.selectedProduct.comments) {
        state.selectedProduct.comments = [];
      }
      if (isReply) {
        // is reply
        const commentIndex = state.selectedProduct.comments.findIndex(
          (comment) => comment.id === rootCommentId
        );
        if (commentIndex === -1) {
          return;
        }
        if (!state.selectedProduct.comments[commentIndex].replies) {
          state.selectedProduct.comments[commentIndex].replies = [];
        }
        state.selectedProduct.comments[commentIndex].replies.push(comment);
        return;
      }
      state.selectedProduct.comments.unshift(comment);
    });
  }
});

export const {
  setListHomeProduct,
  setSelectedProduct,
  setFilterBrand,
  setFilterPrice,
  setFilterDisplay,
  setFilterStorage,
  setFilterRam,
  setFilter
} = homeSlice.actions;
export default homeSlice.reducer;
