import {
  CartItemType,
  CartState,
  setCart,
  updateSelectedCartItem
} from '@app/slice/cartSlice';
import { RootState, Store, useAppDispatch } from '@app/store';
import {
  CODIcon,
  CouponIcon,
  TrashIcon,
  TruckIcon,
  VNPayIcon
} from '@assets/icons';
import Layout from '@components/common/Layout';
import axiosClient from '@utils/api';
import { formatMoney } from '@utils/index';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import CartItem from '@components/common/checkout/cart/CartItem';
import { useSelector } from 'react-redux';
import Tooltip from '@components/common/Tooltip';
import Tippy from '@tippyjs/react';
import useAsyncEffect from 'use-async-effect';
import { setAddress } from '@app/slice/authSlice';
import SelectAddressDrawer from '@components/common/checkout/cart/SelectAddressDrawer';
import dayjs from '@utils/dayjs';
import DeliveryOption from '@components/common/checkout/payment/DeliveryOption';
import PaymentMethodOption from '@components/common/checkout/payment/PaymentMethodOption';
import { PaymentType } from '@types';

const PaymentPage: NextPage<any> = () => {
  const cart: CartState = useSelector((state: RootState) => state.cart);
  const shippingAddress = cart.shippingAddress;
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const [selectedAllCartItem, setSelectedAllCartItem] = useState(
    cart.items.every((item) => item.selected === true)
  );
  const atLeastOneItemSelected = cart.items.some(
    (item) => item.selected === true
  );

  const [visibleSelectAddress, setVisibleSelectAddress] = useState(false);

  const [deliveryOption, setDeliveryOption] = useState([]);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<{
    total: number;
    [key: string]: any;
  }>();

  const [paymentMethod, setPaymentMethod] = useState<'VNPAY' | 'COD'>('COD');

  const productTotal = useCallback(
    () =>
      cart.items
        .filter((item) => item.selected === true)
        .reduce((accumulator, currentValue) => {
          const price = currentValue.discount
            ? currentValue.option.price * 0.01 * (100 - currentValue.discount)
            : currentValue.option.price;
          return (accumulator += currentValue.quantity * price);
        }, 0),
    [cart]
  );

  useEffect(() => {
    setSelectedDeliveryOption(deliveryOption[0]);
  }, [deliveryOption]);

  useEffect(() => {
    const totalPrice = productTotal() + (selectedDeliveryOption?.total || 0);
    setTotal(totalPrice);
  }, [productTotal, selectedDeliveryOption]);
  // const [defaultAddress, setDefaultAddress] = useState<AddressType>();
  // const defaultAddress = useSelector(
  //   (state: RootState) => state.auth.address
  // )?.find((item) => item.isDefault === true);

  // useAsyncEffect(async () => {
  //   try {
  //     const address: AddressType = await axiosClient.get('address/default');
  //     setDefaultAddress(address);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const [checkoutCart, setCheckoutCart] = useState<any>(cart);

  // const handleChangeProductToCheckoutCart = (id: string, checked: boolean) => {
  //   if (checked) {
  //     //add
  //     const product = cart.listProduct.find((product) => product.id === id);
  //     setCheckoutCart([...checkoutCart, product]);
  //     return;
  //   }
  //   //remove
  //   const newCheckoutCart = checkoutCart.filter(
  //     (product: CartType) => product.id !== id
  //   );
  //   setCheckoutCart([...newCheckoutCart]);
  // };

  useAsyncEffect(async () => {
    setLoadingDelivery(true);
    const result: [] = await axiosClient.post('/order/shipping', {
      storeId: 1,
      to_district: shippingAddress?.districtId,
      to_ward: shippingAddress?.wardCode
    });
    setLoadingDelivery(false);
    setDeliveryOption(result);
  }, [shippingAddress?.id]);

  useEffect(() => {
    const selectedAllCartItem = cart.items.every(
      (item) => item.selected === true
    );
    setSelectedAllCartItem(selectedAllCartItem);
  }, [cart.items]);

  const checkout = async () => {
    if (paymentMethod === 'VNPAY') {
      const payment_url_vnpay: string = await axiosClient.post(
        'vnp/create_payment_url',
        {
          finalTotal: total,
          products: cart.items.filter((item) => item.selected === true),
          shippingInfo: selectedDeliveryOption,
          shippingAddress,
          paymentType: PaymentType.VNP
        }
      );
      window.location.href = payment_url_vnpay;
      return;
    }
    if (paymentMethod === 'COD') {
      return;
    }
  };

  // useEffect(() => {
  //   const totalPrice = calcTotal();
  //   setTotal(totalPrice);
  // }, [cart]);
  return (
    <Layout>
      <Head>
        <title>Giỏ hàng</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto h-main bg-main">
        <div className="max-w-screen-xl w-full px-4">
          <div className="my-5 mx-0"></div>
          <div className="flex flex-nowrap justify-between basis-full">
            <div className="flex flex-col flex-1 basis-[910px]">
              <div className="bg-white rounded p-5 mb-4">
                <h4 className="uppercase text-lg m-0 mb-4 leading-7 text-black">
                  Chọn hình thức giao hàng
                </h4>
                <div className="flex flex-wrap gap-x-2">
                  {loadingDelivery
                    ? [1, 2].map((option, index) => (
                        <DeliveryOption key={index} loading={true} />
                      ))
                    : deliveryOption.map((option, index) => (
                        <DeliveryOption
                          key={index}
                          option={option}
                          isSelected={true}
                          handleSelect={() => setSelectedDeliveryOption(option)}
                          loading={false}
                        />
                      ))}
                </div>
              </div>
              <div className="bg-white rounded p-5 mb-4">
                <h4 className="uppercase text-lg m-0 mb-4 leading-7 text-black">
                  Chọn hình thức thanh toán
                </h4>
                <div className="flex flex-col">
                  <PaymentMethodOption
                    method={'Thanh toán tiền mặt khi nhận hàng'}
                    isSelected={paymentMethod === 'COD'}
                    icon={CODIcon}
                    handleSelect={() => setPaymentMethod('COD')}
                  />
                  <PaymentMethodOption
                    method={'Thanh toán bằng VNPAY'}
                    isSelected={paymentMethod === 'VNPAY'}
                    icon={VNPayIcon}
                    iconClassName="h-[32px] w-[32px]"
                    handleSelect={() => setPaymentMethod('VNPAY')}
                  />
                </div>
              </div>
            </div>
            {!isEmpty(cart.items) && (
              <div className="flex-1 basis-[calc(100%-930px)] ml-5 mb-4">
                <div>
                  <div>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="flex justify-between mb-4">
                        <h3 className="flex items-center font-medium text-13 text-[#38383d]">
                          <TruckIcon className="mr-2 h-5 w-5" />
                          <span>Địa chỉ</span>
                        </h3>
                        <a
                          className="cursor-pointer"
                          onClick={() => setVisibleSelectAddress(true)}
                        >
                          Thay đổi
                        </a>
                        {visibleSelectAddress && (
                          <SelectAddressDrawer
                            onClose={() => setVisibleSelectAddress(false)}
                            selectedAddressId={shippingAddress?.id}
                          />
                        )}
                      </div>
                      <div className="flex flex-nowrap justify-between space-x-3 mt-4 h-10">
                        <div className="flex flex-1 items-center font-semibold mb-1 text-[#38383d]">
                          {shippingAddress ? (
                            <>
                              <p>{shippingAddress?.name}</p>
                              <i className="block w-px mx-3 h-full bg-[#ebebf0]"></i>
                              <p> {shippingAddress?.phone}</p>
                            </>
                          ) : (
                            <div className="animate-pulse flex flex-1 gap-4">
                              <div className="h-5 rounded flex-2 bg-[#f5f5fa]"></div>
                              <div className="h-5 bg-zinc-200 rounded flex-1"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-[#808089]">
                        {shippingAddress ? (
                          `${shippingAddress?.address}, ${shippingAddress?.ward}, ${shippingAddress?.district}, ${shippingAddress?.province}`
                        ) : (
                          <div className="animate-pulse">
                            <div className="h-5 bg-zinc-200 rounded-md"></div>
                            <div className="h-5 bg-zinc-200 rounded-md w-2/5 mt-1"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-white rounded p-4 mb-4">
                      <h4 className="flex items-center font-medium text-13 text-[#242424]">
                        <CouponIcon className="mr-2" />
                        <span>Khuyến mãi</span>
                      </h4>
                      <div className="flex flex-nowrap justify-between space-x-3 mt-4 h-10">
                        <input
                          className="flex-1 py-3 px-2 border outline-none rounded w-auto block placeholder:text-13 text-gray-500"
                          placeholder="Nhập mã..."
                        />
                        <button className="bg-blue-400 text-white text-center block cursor-pointer rounded p-2 hover:bg-blue-500">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded pb-2">
                      <ul className=" list-none px-5 py-4 border-b-px border-[#f4f4f4]">
                        <li className="flex flex-nowrap mb-2.5 justify-between">
                          <div className="font-light text-[#333333]">
                            Tạm tính
                          </div>
                          <div>{formatMoney(productTotal())}</div>
                        </li>
                        <li className="flex flex-nowrap mb-2.5 justify-between">
                          <div className=" font-light text-[#333333]">
                            Giảm giá
                          </div>
                          <div>0đ</div>
                        </li>
                        <li className="flex flex-nowrap mb-2.5 justify-between">
                          <div className=" font-light text-[#333333]">
                            Phí vận chuyển
                          </div>
                          <div>
                            {formatMoney(selectedDeliveryOption?.total)}
                          </div>
                        </li>
                      </ul>
                      <div className="py-4 px-5 flex flex-nowrap justify-between">
                        <span className="font-light text-[#333333]">
                          Tổng tiền
                        </span>
                        <div>
                          {!atLeastOneItemSelected ? (
                            <div className="text-[15px] font-medium text-right text-[#fe3834]">
                              Vui lòng chọn sản phẩm
                            </div>
                          ) : (
                            <div className="text-[22px] font-normal text-right text-red-600">
                              {formatMoney(total)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 text-white text-center w-full block cursor-pointer rounded mt-4 py-3 px-2 border-none hover:opacity-80"
                    onClick={checkout}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

PaymentPage.getInitialProps = async (
  context: NextPageContext & { store: Store }
) => {
  const cookies = parseCookies(context);
  const TOKENS = cookies['TOKENS'] || '{}';
  const TOKENS_VALUE = JSON.parse(TOKENS);
  try {
    const cart: CartState = await axiosClient.get('/cart', {
      headers: {
        Authorization: TOKENS_VALUE.accessToken
          ? `Bearer ${TOKENS_VALUE.accessToken}`
          : ''
      }
    });
    context.store.dispatch(setCart(cart));
    return { cart: cart };
  } catch (err) {
    return {
      cart: {
        items: []
      }
    };
  }
};
export default PaymentPage;
