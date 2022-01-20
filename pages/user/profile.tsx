import Head from 'next/head';

const Profile: React.FC<any> = (props: any) => {
  return (
    <div>
      <Head>
        <title>Thông tin người dùng</title>
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

export default Profile;
