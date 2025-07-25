import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import commerceReducer from './slices/commerceSlice';
import guildReducer from './slices/guildSlice';
import currencyReducer from './slices/currencySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    commerce: commerceReducer,
    guild: guildReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;