import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import Milk from '../../types';

interface IState {
  milks: Milk[],
  status: string
}

const initialState: IState = {
  milks: [],
  status: 'idle'
}

export const fetchMilk = createAsyncThunk('milk/fetchMilk', async () => {
  const response = await axios.get('/milk');
  return response.data.db.results;
});

export const patchMilk = createAsyncThunk<Milk, {id: string, liter: string}, {}>('milk/patchMilk', async (data ) => {
  const order = await axios.patch(`milk/${data.id}`, {data});
  return (await order.data) as Milk
})

export const milkSlice = createSlice({
  name: 'milk',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMilk.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.milks = state.milks.concat(action.payload)
      })
      .addCase(patchMilk.fulfilled, (state, action) => {
        const index = state.milks.findIndex(item => item.id === action.payload.id)
        state.milks.splice(index, 1, action.payload)
        })
      }
})

export const selectMilk = (state: RootState) => state.milk.milks;

export default milkSlice.reducer