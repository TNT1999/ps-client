import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '@components/common/Layout';
import { useState, FunctionComponent } from 'react';
import axiosClient from '@utils/api';
import useAsyncEffect from 'use-async-effect';
import {
  ArrowRightIcon,
  CartIcon,
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  SpinnerIcon,
  TruckIcon
} from '@assets/icons';
import { useRouter } from 'next/router';
import { formatMoney } from '@utils/index';
import dayjs from '@utils/dayjs';
import dynamic from 'next/dynamic';
import { delay } from '@utils/misc';
import { motion } from 'framer-motion';
import { OrderStatus, PaymentType } from '@types';
import UserAvatar from '@components/common/Avatar';
import { io } from 'socket.io-client';
const NavigationMenu = dynamic(
  () => import('@components/admin/navigation/NavigationMenu'),
  {
    ssr: false
  }
);
const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT, { transports: ['websocket'] });
type Props = any;

const Loading: FunctionComponent<any> = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-transparent select-none">
      <div className="flex items-center">
        <SpinnerIcon className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
};
const LoadingOverLay: FunctionComponent<any> = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-[#00000066] select-none">
      <div className="flex items-center text-white">
        <SpinnerIcon className="animate-spin mr-2 h-12 w-12 fill-current" />
      </div>
    </div>
  );
};

const renderStatusOrder = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.WAIT_CONFIRMED:
      return (
        <p className="whitespace-no-wrap bg-[#ededed] text-[#707070] w-fit py-1 px-3 rounded text-xs">
          Chờ xác nhận
        </p>
      );
    case OrderStatus.SHIPPING:
      return (
        <p className="whitespace-no-wrap bg-[#fff19c] text-[#c59c08] w-fit py-1 px-3 rounded text-xs">
          Đang giao hàng
        </p>
      );
    case OrderStatus.SUCCESS:
      return (
        <p className="whitespace-no-wrap bg-green-200 text-green-600 w-fit py-1 px-3 rounded text-xs">
          Đã nhận hàng
        </p>
      );
    case OrderStatus.CANCELED:
      return (
        <p className="whitespace-no-wrap bg-red-500 text-gray-100 w-fit py-1 px-3 rounded text-xs">
          Đã huỷ đơn hàng
        </p>
      );
  }
};

const OrderDetailPage: NextPage<Props> = () => {
  const [order, setOrder] = useState<any>();
  const [user, setUser] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingOverlay, setLoadingOverlay] = useState(false);
  const router = useRouter();
  const orderId = router.query.id;

  useAsyncEffect(async () => {
    setLoading(true);
    const [order]: any = await Promise.all([
      axiosClient.get(`origin/order/${orderId}`),
      delay(500)
    ]);
    const user = await axiosClient.get(`origin/user/${order.userId}`);
    setOrder(order);
    setUser(user);
    setLoading(false);
  }, []);

  const renderHandleOrderButton = (orderStatus: OrderStatus, oid: string) => {
    const makeShippingOrder = async () => {
      setLoadingOverlay(true);
      await axiosClient.patch(`order/shipping/${oid}`);
      const [newOrder] = await Promise.all([
        axiosClient.get(`origin/order/${oid}`),
        delay(500)
      ]);
      setOrder(newOrder);
      socket.emit('orderChangeStatus', {
        status: OrderStatus.SHIPPING,
        userId: user.id,
        orderId: oid
      });
      setLoadingOverlay(false);
    };
    const makeFinishOrder = async () => {
      setLoadingOverlay(true);
      await axiosClient.patch(`order/success/${oid}`);
      const [newOrder] = await Promise.all([
        axiosClient.get(`origin/order/${oid}`),
        delay(500)
      ]);
      setOrder(newOrder);
      socket.emit('orderChangeStatus', {
        status: OrderStatus.SUCCESS,
        userId: user.id,
        orderId: oid
      });
      setLoadingOverlay(false);
    };
    switch (orderStatus) {
      case OrderStatus.WAIT_CONFIRMED:
        return (
          <button
            className="px-4 py-2.5 rounded-md text-white bg-[#209cee] cursor-pointer flex justify-center items-center"
            onClick={() => makeShippingOrder()}
          >
            <TruckIcon className="mr-2 h-5 w-5" />
            Giao hàng
          </button>
        );
      case OrderStatus.SHIPPING:
        return (
          <button
            className="px-4 py-2.5 rounded-md text-white bg-[#209cee] cursor-pointer flex justify-center items-center"
            onClick={() => makeFinishOrder()}
          >
            <CheckCircleIcon className="mr-2 h-5 w-5" />
            Hoàn thành
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <Layout admin>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto md:h-[calc(100vh-4rem)] h-[calc(100vh-3.5rem)] bg-main">
        <div className="flex flex-row flex-1">
          <NavigationMenu />
          <div className="flex-1 h-full max-h-full overflow-y-auto">
            {isLoadingOverlay && <LoadingOverLay />}
            <div className="max-w-screen-xl m-auto h-full">
              {isLoading ? (
                <Loading />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between pb-8">
                    {/* <div className="flex text-gray-600 items-center justify-center">
                      <ArrowLeftIcon
                        className="cursor-pointer mr-4 hover:text-black w-4 h-4"
                        onClick={() => router.push('/dashboard/order')}
                      />
                      <span className="font-medium">Đơn hàng</span>
                    </div> */}

                    {/* <div className="flex items-center justify-between">
                    <div className="flex bg-white items-center p-2.5 rounded-full shadow-sm w-80">
                      <SearchIcon className="h-6 w-6 text-gray-400" />
                      <input
                        className="outline-none ml-2 block w-full"
                        type="text"
                        name=""
                        id=""
                        placeholder="Search..."
                      />
                    </div>
                  </div> */}
                  </div>
                  <div className="flex items-center justify-between pb-8">
                    <div className="flex gap-x-4">
                      <h2 className="font-medium text-2xl text-gray-600">
                        Đơn hàng{' '}
                        <span className="text-black">{`#${orderId}`}</span>
                      </h2>
                      <div className="flex justify-center items-center">
                        {renderStatusOrder(order.orderStatus)}
                      </div>
                    </div>
                    {/* <span className="flex">
                      <CalendarIcon className="mr-4 text-gray-500" />
                      {dayjs(order?.createdAt).format('DD/MM/YYYY hh:mm a')}
                    </span> */}
                    {renderHandleOrderButton(order.orderStatus, order.orderId)}
                  </div>

                  <div className="rounded-lg overflow-hidden">
                    <div className="flex gap-x-4">
                      <div className="flex-3">
                        <div className="shadow bg-white p-4 mb-4 rounded-md">
                          <div className="flex flex-col">
                            <h2 className="text-xl mb-6">Sản phẩm</h2>
                            {order.products.map((product: any) => {
                              return (
                                <div
                                  key={product.id}
                                  className="flex justify-between mb-6 last:mb-0"
                                >
                                  <div className="flex flex-4">
                                    <img
                                      className="mr-4 w-20 h-20"
                                      src={product.option.images[0]}
                                      alt={`${product.name} - ${product.option.name}`}
                                    />
                                    <div>
                                      <a className="text-[#242424]">
                                        {`${product.name} - ${product.option.name}`}
                                      </a>
                                      <div className="flex gap-x-2 mt-4"></div>
                                    </div>
                                  </div>
                                  <div className="flex-1 border-none table-cell py-5 px-4 align-top min-w-[100px] text-[#242424] text-right">
                                    x{product.quantity}
                                  </div>
                                  <div className="flex-2 border-none table-cell py-5 px-4 align-top min-w-[100px] text-[#242424] whitespace-nowrap text-right">
                                    {formatMoney(
                                      product.option.price *
                                        (100 - product.discount) *
                                        0.01
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="shadow bg-white p-4 mb-4 rounded-md">
                          <h2 className="text-xl mb-2">Giao hàng</h2>
                          <div className="flex justify-between bg-white p-3 flex-1">
                            <div>
                              <p className="mt-1">Giao hàng tiêu chuẩn</p>
                              <p className="mt-3 italic text-[#00ab56]">
                                {order.orderStatus === OrderStatus.SUCCESS && (
                                  <>
                                    Giao vào{' '}
                                    <span className="capitalize">
                                      {dayjs(
                                        order.shippingInfo.deliveredAt
                                      ).format('dddd, DD/MM/YYYY')}
                                    </span>
                                  </>
                                )}
                                {order.orderStatus !== OrderStatus.SUCCESS && (
                                  <>
                                    Dự kiến giao vào{' '}
                                    <span className="capitalize">
                                      {dayjs
                                        .unix(order.shippingInfo.leadtime)
                                        .format('dddd, DD/MM/YYYY')}
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                            <div>{formatMoney(order.shippingInfo.total)}</div>
                          </div>
                        </div>

                        <div className="shadow bg-white p-4 mb-4 rounded-md">
                          <h2 className="text-xl mb-2">Thanh toán</h2>
                          <div className="flex justify-between bg-white flex-1">
                            <div className="flex flex-1 flex-col">
                              <div className="flex flex-1 py-3 justify-between">
                                Thanh toán bằng{' '}
                                {order.paymentType === PaymentType.VNP
                                  ? ' VNP'
                                  : ' tiền mặt khi nhận hàng'}
                              </div>
                              <div className="flex flex-1 py-3 justify-between">
                                <span className="text-[#787878] text-base">
                                  Tạm tính
                                </span>
                                <div className="text-[#242424]">
                                  {formatMoney(
                                    order.finalTotal - order.shippingInfo.total
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-1 py-3 justify-between">
                                <span className="text-[#787878] text-base">
                                  Phí vận chuyển
                                </span>
                                <div className="text-[#242424]">
                                  {formatMoney(order.shippingInfo.total)}
                                </div>
                              </div>

                              <div className="flex flex-1 py-3 justify-between">
                                <span className="text-[#787878] text-base">
                                  Tổng cộng
                                </span>
                                <div className="text-[#ff3b27] text-xl">
                                  {formatMoney(order.finalTotal)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shadow bg-white p-4 mb-4 rounded-md">
                          <h2 className="text-xl mb-2">Hoạt động</h2>
                          <ol className="relative border-l border-gray-200 mt-6">
                            <li className="mb-4 ml-4">
                              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                              <time className="mb-1 text-sm font-normal leading-none text-gray-600 capitalize">
                                {dayjs(order.createdAt).format(
                                  'dddd, DD/MM/YYYY hh:mm'
                                )}
                              </time>
                              <p className=" text-lg font-medium text-gray-900">
                                Đặt hàng
                              </p>
                            </li>
                            {order.canceledAt && (
                              <li className="mb-4 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-600 capitalize">
                                  {dayjs(order.canceledAt).format(
                                    'dddd, DD/MM/YYYY hh:mm'
                                  )}
                                </time>
                                <p className=" text-lg font-medium text-gray-900">
                                  Huỷ đơn hàng
                                </p>
                              </li>
                            )}
                            {order.shippingInfo.shippingAt && (
                              <li className="mb-4 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-600 capitalize">
                                  {dayjs(order.shippingInfo.shippingAt).format(
                                    'dddd, DD/MM/YYYY hh:mm'
                                  )}
                                </time>
                                <p className=" text-lg font-medium text-gray-900">
                                  Bẳt đầu giao hàng
                                </p>
                              </li>
                            )}
                            {order.shippingInfo.deliveredAt && (
                              <li className="ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-600 capitalize">
                                  {dayjs(order.shippingInfo.deliveredAt).format(
                                    'dddd, DD/MM/YYYY hh:mm'
                                  )}
                                </time>
                                <p className=" text-lg font-medium text-gray-900">
                                  Giao hàng thành công
                                </p>
                              </li>
                            )}
                          </ol>
                        </div>
                      </div>
                      <div className="shadow flex-1 bg-white rounded-md self-start">
                        <div className="flex p-4 flex-col">
                          <h2 className="text-xl mb-2">Khách hàng</h2>
                          <div className="flex items-center justify-between py-4 border-b border-gray-100 text-gray-700 hover:text-black cursor-pointer">
                            <div className="flex items-center">
                              <UserAvatar name={user.name} />
                              <span className="ml-2">{user.name}</span>
                            </div>
                            {/* <ArrowRightIcon className="w-4 h-4" /> */}
                          </div>
                          {/* <div className="flex items-center justify-between py-4 border-b border-gray-100 text-gray-700 hover:text-black cursor-pointer">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#e6ebf9]">
                                <CartIcon
                                  name={user.name}
                                  className="w-4 h-4 text-[#466ff0]"
                                />
                              </div>
                              <span className="ml-2">5 Orders</span>
                            </div>
                            <ArrowRightIcon className="w-4 h-4" />
                          </div> */}
                          <div className="flex flex-col items-center justify-between py-4 border-b border-gray-100">
                            <h2 className="text-13 font-medium mb-4 self-start">
                              Thông tin khách hàng
                            </h2>
                            {user.email && (
                              <div className="flex items-center self-start py-2 text-gray-700">
                                <MailIcon className="mr-2" />
                                <span className="">{user.email}</span>
                              </div>
                            )}
                            {user.phone && (
                              <div className="flex items-center self-start py-2 text-gray-700">
                                <PhoneIcon className="mr-2 h-5 w-5" />
                                <span className="">{user.phone}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-center justify-between py-4">
                            <h2 className="text-13 font-medium mb-4 self-start">
                              Địa chỉ giao hàng
                            </h2>
                            <div className="flex flex-col gap-y-2 self-start text-gray-700">
                              <span>{user.name}</span>
                              {user.phone && <span>{user.phone}</span>}
                              <span>{order.shippingAddress.address}</span>
                              <span>{order.shippingAddress.ward}</span>
                              <span>{order.shippingAddress.district}</span>
                              <span>{order.shippingAddress.province}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="bg-white w-full">
                    <div className="p-2 pt-4">
                      <div className="inline-block min-w-full rounded-lg overflow-hidden"></div>
                    </div>
                  </div> */}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetailPage;
