import Breadcrumb from '@components/breadcrumb';
import Divider from '@components/common/Divider';
import Layout from '@components/common/Layout';
import SideBar from '@components/common/user/SideBar';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

type Props = any;
enum Status {
  ALL = 'all',
  AWAITING_PAYMENT = 'awaiting_payment',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}
const OrderPage: NextPage<Props> = () => {
  const [status, setStatus] = useState<Status>(Status.ALL);
  return (
    <Layout>
      <Head>
        <title>Thông tin tài khoản</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto h-main bg-main">
        <div className="max-w-screen-xl w-full px-4">
          <div className="p-4 justify-center flex-col flex gap-x-4">
            <Breadcrumb
              breadcrumbs={[
                { value: 'Trang chủ', href: '/dien-thoai' },
                { value: 'Đơn hàng của tôi', href: '/user/order' }
              ]}
            />
            <Divider className="mt-0 mb-4" />
          </div>
          <div className="flex">
            <SideBar active="order" />
            <div className="flex-1">
              <div className="text-2xl font-light mt-1 mb-4">
                Đơn hàng của tôi
              </div>
              <div className="bg-white">
                <div>
                  <div className="text-center text-gray-500 border-b border-gray-200">
                    <ul className="flex flex-wrap -mb-px leading-4">
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.ALL,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.ALL
                            }
                          )}
                          onClick={() => setStatus(Status.ALL)}
                        >
                          Tất cả
                        </div>
                      </li>
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2 ',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.AWAITING_PAYMENT,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.AWAITING_PAYMENT
                            }
                          )}
                          onClick={() => setStatus(Status.AWAITING_PAYMENT)}
                        >
                          Chờ thanh toán
                        </div>
                      </li>
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.PROCESSING,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.PROCESSING
                            }
                          )}
                          onClick={() => setStatus(Status.PROCESSING)}
                        >
                          Đang xử lý
                        </div>
                      </li>
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.SHIPPING,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.SHIPPING
                            }
                          )}
                          onClick={() => setStatus(Status.SHIPPING)}
                        >
                          Đang vận chuyển
                        </div>
                      </li>
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.COMPLETED,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.COMPLETED
                            }
                          )}
                          onClick={() => setStatus(Status.COMPLETED)}
                        >
                          Đã giao
                        </div>
                      </li>
                      <li className="mr-2">
                        <div
                          className={classNames(
                            'cursor-pointer px-5 py-4 border-b-2',
                            {
                              'border-[#0d5cb6] text-[#0d5cb6]':
                                status === Status.CANCELED,
                              'hover:text-gray-600 hover:border-gray-300 border-transparent':
                                status !== Status.CANCELED
                            }
                          )}
                          onClick={() => setStatus(Status.CANCELED)}
                        >
                          Đã huỷ
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default OrderPage;
