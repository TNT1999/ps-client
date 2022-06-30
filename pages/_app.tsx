import '../styles/main.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { initializeStore, Store, useStore } from '@app/store';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { getMe } from 'app/slice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCountCart } from '@app/slice/cartSlice';
import { parseCookies } from 'nookies';
import isNil from 'lodash/isNil';
import useAsyncEffect from 'use-async-effect';
function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const [isUserLoaded, setUserLoaded] = useState(false);

  useAsyncEffect(async () => {
    const cookies = parseCookies();
    const TOKENS = cookies['TOKENS'] || '{}';
    const TOKENS_VALUE = JSON.parse(TOKENS);
    const token = TOKENS_VALUE.accessToken;
    if (isNil(token)) {
      return setUserLoaded(true);
    }
    try {
      await Promise.all([
        store.dispatch(getMe()).unwrap(),
        store.dispatch(getCountCart()).unwrap()
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setUserLoaded(true);
    }
    // store.dispatch(restoreCartFromLocalStorage());
    // restore cart
  }, []);
  return (
    <Provider store={store}>
      {/* <NextUIProvider> */}
      <ToastContainer />
      <NextNprogress
        color="#0270d1"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={false}
      />
      <Component {...pageProps} />
      {/* </NextUIProvider> */}
    </Provider>
  );
}

type AppContextWithStore = {
  Component: NextComponentType<
    NextPageContext,
    Record<string, unknown>,
    Record<string, unknown>
  >;
  AppTree: AppTreeType;
  ctx: NextPageContext & {
    store?: Store;
  };
  router: Router;
};

MyApp.getInitialProps = async (appContext: AppContextWithStore) => {
  const reduxStore = initializeStore(undefined);
  // console.log('in initialProps _app.js');
  appContext.ctx.store = reduxStore;
  // console.log('appContext', appContext)

  //initialise redux store on server side
  // const { dispatch } = reduxStore
  // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`)
  // dispatch(setListHomeProduct(res.data.products))
  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps = {
    ...appProps.pageProps,
    initialReduxState: reduxStore.getState()
  };

  return appProps;
};

export default MyApp;
