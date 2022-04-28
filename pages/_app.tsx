import '../styles/main.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { initializeStore, Store, useStore } from '@app/store';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { getMe } from 'app/slice';
import TooltipHolder from '@components/common/TooltipHolder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { restoreCartFromLocalStorage } from '@app/slice/cartSlice';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const getUserData = async () => {
    const token = localStorage.getItem(process.env.TOKEN_KEY || 'access_token');
    if (token == null) {
      return setUserLoaded(true);
    }
    try {
      const currentUser = await store.dispatch(getMe()).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setUserLoaded(true);
    }
  };
  useEffect(() => {
    getUserData();
    store.dispatch(restoreCartFromLocalStorage());
    // restore cart
  }, []);
  return (
    <Provider store={store}>
      {/* <NextUIProvider> */}
      <TooltipHolder />
      <ToastContainer />
      <NextNprogress
        color="#3B82F6"
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
