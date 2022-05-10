import Breadcrumb from '@components/breadcrumb';
import Divider from '@components/common/Divider';
import Layout from '@components/common/Layout';
import SideBar from '@components/common/user/SideBar';
import { NextPage } from 'next';
import Head from 'next/head';

type Props = any;
const AccountPage: NextPage<Props> = () => {
  return (
    <Layout>
      <Head>
        <title>Thông tin tài khoản</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto h-main bg-main">
        <div className="max-w-screen-xl w-full">
          <div className="p-4 justify-center flex-col flex gap-x-4">
            <Breadcrumb
              breadcrumbs={[
                { value: 'Trang chủ', href: '/dien-thoai' },
                { value: 'Thông tin tài khoản', href: '/profile' }
              ]}
            />
            <Divider className="mt-0 mb-4" />
          </div>
          <div className="flex">
            <SideBar active="profile" />
            <div className="flex-1">
              <div>Thông tin tài khoản</div>
              <div className="bg-white"></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default AccountPage;
