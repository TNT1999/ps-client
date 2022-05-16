import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@utils/api';
import nookies from 'nookies';

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

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const user: UserInfo = await axiosClient.get('auth/me');
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// export const logOut = createAsyncThunk('auth/logOut', async () => {});
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<UserData>) {
      // localStorage.setItem(
      //   process.env.TOKEN_KEY || 'access_token',
      //   action.payload.accessToken
      // );
      // localStorage.setItem(
      //   process.env.REFRESH_KEY || 'refresh_token',
      //   action.payload.refreshToken
      // );
      nookies.set(null, 'TOKENS', JSON.stringify(action.payload), {
        // httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      });
      state.user = action.payload.user;
      window.location.reload();
    },
    logout(state) {
      // localStorage.removeItem(process.env.TOKEN_KEY || 'access_token');
      // localStorage.removeItem(process.env.REFRESH_KEY || 'refresh_token');
      nookies.destroy(null, 'TOKENS', {
        path: '/'
      });
      state.user = null;
      window.location.reload();
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
