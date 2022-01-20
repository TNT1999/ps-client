import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

const authSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchMe(state) {
      state.value += 1;
    }
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  }
});

export const { fetchMe } = authSlice.actions;
export default authSlice.reducer;
