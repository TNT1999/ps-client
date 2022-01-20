import Head from 'next/head';

const Order: React.FC<any> = (props: any) => {
  return (
    <div>
      <Head>
        <title>Đơn hàng</title>
      </Head>
      <body>{/* {JSON.stringify(props)} */}</body>
    </div>
  );
};

export async function getServerSideProps() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return {
    props: {
      a: 12,
      b: 123,
      isLogin: false
    }
  };
}

export default Order;
