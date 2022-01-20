import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  name: string;
  slug: string;
  thumbnail: string;
  price: any;
  reviewCount: number;
  ratingValue: number;
};
type Filter = {
  price: Array<string>;
  brand: Array<string>;
  ram: Array<string>;
  storage: Array<string>;
  display: Array<string>;
};
type SelectedProduct = {
  product: Product;
};
type Search = {
  keywork: string;
  searchProducts: Array<string>;
};
interface HomeState {
  product: Array<Product>;
  filter: Filter;
  selectedProduct: SelectedProduct;
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
  selectedProduct: {
    product: null
  },
  search: {
    keywork: null,
    searchProducts: []
  }
} as unknown as HomeState;

type FilterStore = {
  brand: string;
  ram: string;
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setListHomeProduct(state, action: PayloadAction<Array<Product>>) {
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
    setFilterBrand(state, action: PayloadAction<Array<string> | string>) {
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
    setFilterRam(state, action: PayloadAction<Array<string> | string>) {
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
    setFilterStorage(state, action: PayloadAction<Array<string> | string>) {
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
    setFilterDisplay(state, action: PayloadAction<Array<string> | string>) {
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
    setFilterPrice(state, action: PayloadAction<Array<string> | string>) {
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

    setSelectedProduct(state, action: PayloadAction<any>) {
      state.selectedProduct = action.payload;
    },
    setSearch(state, action: PayloadAction<any>) {
      state.search = action.payload;
    }
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
