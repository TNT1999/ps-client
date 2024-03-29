import Breadcrumb from '@components/breadcrumb';
import Divider from '@components/common/Divider';
import Layout from '@components/common/Layout';
import SideBar from '@components/common/user/SideBar';
import useAsyncEffect from 'use-async-effect';
import { NextPage } from 'next';
import Head from 'next/head';
import { FunctionComponent, useCallback, useState } from 'react';
import NavBarOrder from '@components/common/user/NavBarOrder';
import axiosClient from '@utils/api';
import { OrderStatus } from '@types';
import OrderHistoryItem from '@components/common/user/OrderHistoryItem';
import { isEmpty } from 'lodash';
import { formatMoney } from '@utils/index';
import { SlashIcon, TruckIcon, SpinnerIcon, ClockIcon } from '@assets/icons';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
type Props = any;

enum Status {
  ALL = 'all',
  AWAITING_PAYMENT = 'awaiting_payment',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

const SkeletonItem: FunctionComponent<any> = () => {
  return (
    <div className="bg-white mb-5 py-4 px-5 rounded animate-pulse">
      <div className="h-6 bg-skeleton" />
      <div className="flex justify-between items-center py-4">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="h-20 w-20 bg-skeleton border-none rounded-sm" />
            <div className="flex flex-1 flex-col ml-4">
              <span className="bg-skeleton h-6 w-full my-2" />
              <span className="bg-skeleton h-6 w-1/2 my-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-end mt-3">
        <div className="flex w-52 gap-x-2">
          <div className="flex-1 h-9 py-3 px-2 bg-skeleton rounded-sm" />
          <div className="flex-1 h-9 py-3 px-2 bg-skeleton rounded-sm" />
        </div>
      </div>
    </div>
  );
};
const LoadingOverlay: FunctionComponent<any> = () => {
  return (
    <div className="flex items-center justify-center select-none my-20">
      <div className="flex items-center text-lg">
        <SpinnerIcon className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
};
const OrderPage: NextPage<Props> = () => {
  const [status, setStatus] = useState<OrderStatus>();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const [orders, setOrders] = useState<any>();
  const onChange = (status?: OrderStatus) => {
    setStatus(status);
  };

  const renderOrderStatus = useCallback((status: OrderStatus) => {
    switch (status) {
      case OrderStatus.CANCELED:
        return (
          <>
            <SlashIcon className="mr-2 h-5 w-5" />
            <span>Đã huỷ</span>
          </>
        );
      case OrderStatus.SUCCESS:
        return (
          <>
            <TruckIcon className="mr-2 h-5 w-5 text-[#00ab56]" />
            <span className="text-[#00ab56]">Giao hàng thành công</span>
          </>
        );
      case OrderStatus.SHIPPING:
        return (
          <>
            <TruckIcon className="mr-2 h-5 w-5 text-[#fda223]" />
            <span className="text-[#fda223]">Đang giao hàng</span>
          </>
        );
      case OrderStatus.WAIT_CONFIRMED:
        return (
          <>
            <ClockIcon className="mr-2 h-5 w-5 text-[#ee3b3b]" />
            <span className="text-[#ee3b3b]">Chờ xác nhận</span>
          </>
        );
    }
  }, []);
  useAsyncEffect(async () => {
    setLoadingOrders(true);
    const orders = await axiosClient.get('orders', {
      params: {
        status
      }
    });
    setLoadingOrders(false);
    setOrders(orders);
  }, [status]);

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
            <Divider />
          </div>
          <div className="flex">
            <SideBar active="order" />
            <div className="flex-1">
              <div className="text-2xl font-light mt-1 mb-4">
                Đơn hàng của tôi
              </div>
              <NavBarOrder status={status} onChange={onChange} />
              {loadingOrders ? (
                <LoadingOverlay />
              ) : !isEmpty(orders) ? (
                orders.map((order: any) => {
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="bg-white mb-5 py-4 px-5 rounded"
                    >
                      <div className="flex items-center pb-3 font-medium border-b border-[#ebebf0] text-[#808089]">
                        {renderOrderStatus(order.orderStatus)}
                      </div>
                      <OrderHistoryItem items={order.products} />
                      {
                        <div className="flex flex-col w-full items-end">
                          <div className="flex mb-3 text-lg">
                            <div className="mr-2 text-[#808089] font-light">
                              Tổng tiền:
                            </div>
                            <div className="text-[#38383d] font-normal">
                              {formatMoney(order.finalTotal)}
                            </div>
                          </div>
                          <div>
                            <div className="flex text-13">
                              {order.orderStatus ===
                                OrderStatus.WAIT_CONFIRMED && (
                                <div className="flex justify-center items-center mr-2 text-red-500 border border-red-500 rounded h-9 py-3 px-2 cursor-pointer">
                                  Huỷ đơn hàng
                                </div>
                              )}
                              <div
                                className="flex justify-center items-center text-[#0b74e5] border border-[#0b74e5] rounded h-9 py-3 px-2 cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    `/user/order/view/${order.orderId}`
                                  )
                                }
                              >
                                Xem chi tiết
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </motion.div>
                  );
                })
              ) : (
                <div>
                  <div className="bg-white h-auto">
                    <div className="flex flex-col items-center w-full p-9">
                      <img
                        className="h-44 w-44"
                        src={
                          'https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png'
                        }
                        alt=""
                      />
                      <p className="text-[#38383d] text-lg mt-4">
                        Chưa có đơn hàng
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default OrderPage;
