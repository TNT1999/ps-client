import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@utils/api';
import nookies from 'nookies';
import { AddressType } from '@types';
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
  user: UserInfo | null;
  address: AddressType[] | null;
};
const initialAuthState: AuthState = {
  user: null,
  address: null
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

export const deleteAddress = createAsyncThunk(
  'deleteAddress',
  async (id: string, { rejectWithValue }) => {
    try {
      const result: { status: string } = await axiosClient.delete('/address', {
        data: { addressId: id }
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createAddress = createAsyncThunk(
  'createAddress',
  async (
    data: Omit<AddressType, 'id' | 'provinceId' | 'districtId' | 'wardId'> & {
      provinceId: string;
      districtId: string;
      wardId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const body: any = { ...data };
      body.provinceId = parseInt(data.provinceId);
      body.districtId = parseInt(data.districtId);
      body.wardId = parseInt(data.wardId);
      const result: AddressType = await axiosClient.post('/address', body);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateAddress = createAsyncThunk(
  'updateAddress',
  async (
    data: Omit<AddressType, 'provinceId' | 'districtId' | 'wardId'> & {
      provinceId: string;
      districtId: string;
      wardId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const body: any = { ...data };
      body.provinceId = parseInt(data.provinceId);
      body.districtId = parseInt(data.districtId);
      body.wardId = parseInt(data.wardId);
      const result: AddressType = await axiosClient.put(
        `/address/${body.id}`,
        body
      );
      return result;
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
      state.address = null;
      window.location.reload();
    },
    setAddress(state, action: PayloadAction<AddressType[]>) {
      state.address = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      if (action.payload.status === 'success') {
        const id = action.meta.arg;
        state.address = state.address?.filter((item) => item.id !== id) || null;
      }
    });
  }
});

export const { login, logout, setAddress } = authSlice.actions;
export default authSlice.reducer;
