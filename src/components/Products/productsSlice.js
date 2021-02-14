import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getProductsService,
  checkProductQuantityService,
} from '../../services';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const { data } = await getProductsService();
    return data;
  },
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increaseProductQuantity(state, { payload }) {
      state.products = state.products.map((product) =>
        product.pid === payload
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );
    },
    decreaseProductQuantity(state, { payload }) {
      state.products = state.products.map((product) =>
        product.pid === payload
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      );
    },
    clearProductQuantity(state, { payload }) {
      state.products = state.products.map((product) =>
        product.pid === payload
          ? { ...product, quantity: product.min || 1 }
          : product,
      );
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload.map((product) => ({
        ...product,
        quantity: product.min || 1,
      }));
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const allProductsSelector = (state) => state.products.products;
const productsLoadingSelector = (state) => state.products.loading;

const productsActions = productsSlice.actions;
const { clearProductQuantity } = productsActions;

export const checkProductQuantity = (payload) => {
  return async (dispatch) => {
    try {
      await checkProductQuantityService(payload);
    } catch (error) {
      dispatch(clearProductQuantity(payload.pid));
    }
  };
};

export { productsActions };

export { allProductsSelector, productsLoadingSelector };

export default productsSlice.reducer;
