import { useAppDispatch } from '@app/store';
import { AlertTriangleIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { FunctionComponent } from 'react';

type Props = {
  onClose: () => void;
  isDeleteSelected?: boolean;
  productId: string;
  optionId: string;
};
const ConfirmDeleteModal: FunctionComponent<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

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
            <div className="mr-2 rounded cursor-pointer py-2 px-4 text-[#0b74e5] border-px border-[#0b74e5]">
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
