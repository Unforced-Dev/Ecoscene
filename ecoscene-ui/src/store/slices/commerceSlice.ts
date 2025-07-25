import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../mocks/data';

interface CommerceState {
  products: Product[];
  cart: Array<{ product: Product; quantity: number }>;
  wishlist: Product[];
  loading: boolean;
  error: string | null;
  filter: {
    category?: string;
    certification?: string;
    priceRange?: [number, number];
  };
}

const initialState: CommerceState = {
  products: [],
  cart: [],
  wishlist: [],
  loading: false,
  error: null,
  filter: {},
};

const commerceSlice = createSlice({
  name: 'commerce',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.product.id !== action.payload);
    },
    updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.cart.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.wishlist.find(p => p.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(p => p.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<typeof initialState.filter>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  setFilter,
} = commerceSlice.actions;

export default commerceSlice.reducer;