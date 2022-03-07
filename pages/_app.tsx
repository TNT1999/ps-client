import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Header from '../components/header';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { initializeStore, Store, useStore } from '../app/store';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import { AppTreeType } from 'next/dist/next-server/lib/utils';
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
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
