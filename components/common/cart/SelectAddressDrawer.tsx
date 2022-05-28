import { setAddress } from '@app/slice';
import { RootState, useAppDispatch } from '@app/store';
import { Modal } from '@components/common/modal/Modal';
import { AddressWithIdType } from '@types';
import axiosClient from '@utils/api';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';
import AddressModal, { MODE } from '@components/common/cart/AddressModal';
import SelectAddressItem from '@components/common/cart/SelectAddressItem';
import { updateShippingAddress } from '@app/slice/cartSlice';

type Props = {
  onClose: () => void;
  hidden?: boolean;
  selectedAddressId?: string;
};
const SelectAddressDrawer: FunctionComponent<Props> = ({
  onClose,
  selectedAddressId
}) => {
  const dispatch = useAppDispatch();
  const address = useSelector((state: RootState) => state.auth.address);

  const [stateSelectedAddressId, setStateSelectedAddressId] =
    useState(selectedAddressId);

  const [hidden, setHidden] = useState(false);
  const [visibleNewAddressModal, setVisibleNewAddressModal] = useState(false);
  useAsyncEffect(async () => {
    if (hidden) return;
    const address: AddressWithIdType[] = await axiosClient.get('address');
    dispatch(setAddress(address));
  }, [hidden]);

  // useEffect(() => {
  //   if (!address) return;
  //   setSelectedAddressId(address?.find((item) => item.isDefault === true)?.id);
  // }, [address]);

  const handleHiddenDrawer = useCallback((hidden: boolean) => {
    setHidden(hidden);
  }, []);

  const handleSelectAddress = async () => {
    if (!stateSelectedAddressId) return;
    try {
      const selectedAddress =
        address && address.find((item) => item.id === stateSelectedAddressId);
      if (!selectedAddress) return;
      await dispatch(updateShippingAddress(selectedAddress));
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="fixed top-0 right-0 bottom-0 h-screen overflow-auto animate-expandOutLeft"
      width={480}
      shadow=""
      rounded=""
      onClose={onClose}
      className={`bg-[#27272ab3] ${hidden ? 'hidden' : ''}`}
    >
      <div className="p-8">
        <div className="flex justify-between mb-8">
          <h3 className="uppercase text-lg m-0 leading-7 text-black">
            Địa chỉ giao hàng
          </h3>
          <a
            className="cursor-pointer"
            onClick={() => {
              setHidden(true);
              setVisibleNewAddressModal(true);
            }}
          >
            Tạo địa chỉ mới
          </a>
          {visibleNewAddressModal && (
            <AddressModal
              onClose={() => {
                setVisibleNewAddressModal(false);
                setHidden(false);
              }}
              mode={MODE.NEW}
            />
          )}
        </div>
        <div className="space-y-3">
          {address
            ? address.map((item, index) => {
                return (
                  <SelectAddressItem
                    key={item.id}
                    isSelected={stateSelectedAddressId === item.id}
                    handleSelect={() => setStateSelectedAddressId(item.id)}
                    address={item}
                    handleHiddenDrawer={handleHiddenDrawer}
                  />
                );
              })
            : [1, 2, 3].map((i) => (
                <div key={i} className="py-3">
                  <div className="animate-pulse flex flex-1 gap-4 mb-3">
                    <div className="h-5 bg-zinc-200 rounded flex-2"></div>
                    <div className="h-5 bg-zinc-200 rounded flex-1"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-5 bg-zinc-200 rounded-md"></div>
                    <div className="h-5 bg-zinc-200 rounded-md w-2/5 mt-1"></div>
                  </div>
                </div>
              ))}
        </div>

        {address && (
          <div className="flex text-center justify-end text-base mt-6 h-[36px]">
            <div
              className="rounded cursor-pointer py-2 px-4 text-white border-px border-[#0b74e5] bg-[#0b74e5]"
              onClick={handleSelectAddress}
            >
              Xác nhận
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SelectAddressDrawer;
