import { removeCartItem } from '@app/slice/cartSlice';
import { useAppDispatch } from '@app/store';
import { AlertTriangleIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { FunctionComponent } from 'react';
import { toast } from 'react-toastify';

type Props = {
  onClose: () => void;
  isDeleteSelected?: boolean;
  productId: string;
  optionId: string;
};
const ConfirmDeleteModal: FunctionComponent<Props> = ({
  onClose,
  isDeleteSelected = false,
  productId,
  optionId
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteItem = async () => {
    try {
      await dispatch(
        removeCartItem(
          isDeleteSelected
            ? {}
            : {
                productId,
                optionId
              }
        )
      ).unwrap();
      toast.success('Xoá sản phẩm thành công', {
        autoClose: 1000
      });
    } catch (err) {
      toast.error('Xoá sản phẩm thất bại', {
        autoClose: 1000
      });
    } finally {
      onClose();
    }
  };
  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="p-5 animate-fadeInDown"
      width={312}
      shadow="shadow"
      rounded="rounded"
      onClose={onClose}
      className="bg-[#27272ab3]"
    >
      <div className="flex">
        <div className="bg-white rounded-lg flex-1">
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
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
