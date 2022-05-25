import { setAddress } from '@app/slice';
import { RootState, useAppDispatch } from '@app/store';
import { CheckCircleIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { AddressType } from '@types';
import axiosClient from '@utils/api';
import classNames from 'classnames';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

type Props = {
  onClose: () => void;
};
const SelectAddressDrawer: FunctionComponent<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const address = useSelector((state: RootState) => state.auth.address);
  const [selectedAddress, setSelectedAddress] = useState(
    address?.find((item) => item.isDefault === true)
  );
  const [visibleNewAddressModal, setVisibleNewAddressModal] = useState(false);
  useAsyncEffect(async () => {
    const address: AddressType[] = await axiosClient.get('address');
    dispatch(setAddress(address));
  }, []);

  useEffect(() => {
    if (!address) return;
    setSelectedAddress(address?.find((item) => item.isDefault === true));
  }, [address]);

  // const handleDeleteItem = async () => {
  //   try {
  //     await dispatch().unwrap();
  //     toast.success('Xoá sản phẩm thành công', {
  //       autoClose: 1000
  //     });
  //   } catch (err) {
  //     toast.error('Xoá sản phẩm thất bại', {
  //       autoClose: 1000
  //     });
  //   } finally {
  //     onClose();
  //   }
  // };

  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="fixed top-0 right-0 bottom-0 h-screen overflow-auto animate-expandOutLeft"
      width={480}
      shadow=""
      rounded=""
      onClose={onClose}
      className="bg-[#27272ab3]"
    >
      <div className="p-8">
        <div className="flex justify-between mb-8">
          <h3 className="uppercase text-lg m-0 leading-7 text-black">
            Địa chỉ giao hàng
          </h3>
          <a
            className="cursor-pointer"
            onClick={() => setVisibleNewAddressModal(true)}
          >
            Tạo địa chỉ mới
          </a>
        </div>
        <div className="space-y-3">
          {address?.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames('flex p-4 rounded-md border mb-3', {
                  'border-[#dadada]': item.id !== selectedAddress?.id,
                  'border-blue-500': item.id === selectedAddress?.id
                })}
              >
                <div className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames('w-7 h-7 cursor-pointer', {
                      'text-gray-300': item.id !== selectedAddress?.id,
                      'text-blue-600': item.id === selectedAddress?.id
                    })}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setSelectedAddress(item)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-black">
                    <div className="uppercase mb-3 flex">
                      <p>{item.name}</p>
                      <i className="block w-px mx-3 h-full bg-[#ebebf0]" />
                      <p>{item.phone}</p>
                    </div>
                    {item.isDefault && (
                      <span className="flex items-center self-start text-green-500 text-[12px] normal-case">
                        <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                        <span>Mặc định</span>
                      </span>
                    )}
                  </div>
                  <div>
                    {`${item.address}, ${item.ward}, ${item.district}, ${item.province}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex text-center justify-end text-base mt-6 h-[36px]">
          <div className="rounded cursor-pointer py-2 px-4 text-white border-px border-[#0b74e5] bg-[#0b74e5]">
            Xác nhận
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectAddressDrawer;
