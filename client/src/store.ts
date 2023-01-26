import { configureStore } from '@reduxjs/toolkit';
import milkReducer from './slices/milkSlice';

export const store = configureStore({
  reducer: {
    milk: milkReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch