import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { initializeStore, Store, useStore } from '../app/store';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { login, setCurrentUser, userData } from 'app/slice';
import axiosClient from 'utils/api';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const getUserData = async () => {
    const token = localStorage.getItem(process.env.TOKEN_KEY || 'access_token');
    if (token == null) {
      return setUserLoaded(true);
    }
    try {
      const userData: Record<string, string> = await axiosClient.get('auth/me');
      store.dispatch(setCurrentUser(userData));
    } catch (e) {
      console.error(e);
    } finally {
      setUserLoaded(true);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextNprogress
          color="#3B82F6"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={false}
        />
        <Header />
        <div className="pt-16"></div>
        <Component {...pageProps} />
      </NextUIProvider>
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
