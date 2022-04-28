import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@utils/api';

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  roles: string[];
} | null;
export type UserData = {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
};

export type AuthState = {
  user: UserInfo;
};
const initialAuthState: AuthState = {
  user: null
};

export const getMe = createAsyncThunk('auth/getMe', async () => {
  const user: UserInfo = await axiosClient.get('auth/me');
  return user;
});

// export const logOut = createAsyncThunk('auth/logOut', async () => {});
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<UserData>) {
      localStorage.setItem(
        process.env.TOKEN_KEY || 'access_token',
        action.payload.accessToken
      );
      localStorage.setItem(
        process.env.REFRESH_KEY || 'refresh_token',
        action.payload.refreshToken
      );
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem(process.env.TOKEN_KEY || 'access_token');
      localStorage.removeItem(process.env.REFRESH_KEY || 'refresh_token');
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
