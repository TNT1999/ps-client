import { setAddress } from '@app/slice';
import { removeCartItem } from '@app/slice/cartSlice';
import { RootState, useAppDispatch } from '@app/store';
import { AlertTriangleIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { AddressType } from '@types';
import axiosClient from '@utils/api';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAsyncEffect from 'use-async-effect';

type Props = {
  onClose: () => void;
};
const SelectAddressDrawer: FunctionComponent<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  useAsyncEffect(async () => {
    const address: AddressType[] = await axiosClient.get('address');
    dispatch(setAddress(address));
  }, []);

  const address = useSelector((state: RootState) => state.auth.address);

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
          <a className="cursor-pointer">Tạo địa chỉ mới</a>
        </div>
        <div>
          {address?.map((item, index) => {
            return <div key={index}>{item.name}</div>;
          })}
        </div>
        {/* <div className="bg-white rounded-lg flex-1">
          <div className="flex items-center leading-10 mb-2">
            <AlertTriangleIcon className="text-[#fc9128] mr-2" />
            <div className="text-16 font-medium">Xoá sản phẩm</div>
          </div>
          <div className="text-base text-[#515158]">
            Bạn có muốn xóa sản phẩm đang chọn?
          </div>
          <div className="flex text-center justify-end text-base mt-[24px] h-[36px]">
            <div
              className="mr-2 rounded cursor-pointer py-2 px-4 text-[#0b74e5] border-px border-[#0b74e5]"
              onClick={handleDeleteItem}
            >
              Xác nhận
            </div>
            <div
              className="rounded cursor-pointer py-2 px-4 text-white bg-[#0b74e5]"
              onClick={onClose}
            >
              Huỷ
            </div>
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default SelectAddressDrawer;
