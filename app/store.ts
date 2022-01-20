import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import homeSlice from './slice/homeSlice';
import { useMemo } from 'react';
import logger from 'redux-logger';
import authSlice from './slice/authSlice';
import cartSlice from './slice/cartSlice';

let store: Store | undefined;

const reducer = {
  home: homeSlice,
  auth: authSlice,
  cart: cartSlice
};

function initStore(preloadedState?: RootState) {
  return configureStore({
    reducer,
    // devTools: process.env.NODE_ENV !== 'production',
    // ...(process.env.NODE_ENV === 'production' ? {} : { middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger) }),
    preloadedState
  });
}

export const initializeStore = (preloadedState?: RootState) => {
  let _store = store ?? initStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  const isServer = typeof window === 'undefined';
  if (isServer) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any): Store {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export type RootState = StateFromReducersMapObject<typeof reducer>;

export type Store = ReturnType<typeof initStore>;
export type AppDispatch = Store['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
