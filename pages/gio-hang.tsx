import Head from 'next/head';

const Home: React.FC<any> = (props: any) => {
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
