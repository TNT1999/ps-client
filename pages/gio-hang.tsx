import Head from 'next/head';
import { FunctionComponent } from 'react';

const Home: FunctionComponent<any> = (props: any) => {
  return (
    <div>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <body>{JSON.stringify(props)}</body>
    </div>
  );
};

export default Home;
