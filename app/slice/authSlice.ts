import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type userData = {
  token: string;
  user: Record<string, string>;
};

export type AuthState = {
  user: Record<string, string> | undefined;
};
const initialAuthState: AuthState = {
  user: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<userData>) {
      localStorage.setItem(
        process.env.TOKEN_KEY || 'access_token',
        action.payload.token
      );
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem(process.env.TOKEN_KEY || 'access_token');
      state.user = undefined;
    },
    setCurrentUser(state, action: PayloadAction<Record<string, string>>) {
      console.log('getMe');
      state.user = action.payload;
    }
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  }
});

export const { login, logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
