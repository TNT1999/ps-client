import Head from 'next/head';
import { FunctionComponent } from 'react';

const Login: FunctionComponent<any> = (props: any) => {
  return (
    <div>
      <Head>
        <title>Đăng nhập</title>
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

export default Login;
