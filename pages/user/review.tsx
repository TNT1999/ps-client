import { BellIcon, MapPinIcon, OrderIcon, UserIcon } from '@assets/icons';
import Breadcrumb from '@components/breadcrumb';
import Divider from '@components/common/Divider';
import Layout from '@components/common/Layout';
import SideBar from '@components/common/user/SideBar';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';

type Props = any;
const ReviewPage: NextPage<Props> = () => {
  return (
    <Layout>
      <Head>
        <title>Nhận xét của tôi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto h-main bg-main">
        <div className="max-w-screen-xl w-full px-4">
          <div className="p-4 justify-center flex-col flex gap-x-4">
            <Breadcrumb
              breadcrumbs={[
                { value: 'Trang chủ', href: '/dien-thoai' },
                { value: 'Địa chỉ của tôi', href: '/address' }
              ]}
            />
            <Divider />
          </div>
          <div className="flex">
            <SideBar active="review" />
            <div className="flex-1">
              <div className="text-2xl font-light mt-1 mb-4">
                Nhận xét của tôi
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default ReviewPage;
