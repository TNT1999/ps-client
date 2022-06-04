import classNames from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  status: string;
  onChange: (status: OrderStatus) => void;
};
enum Status {
  ALL = 'all',
  AWAITING_PAYMENT = 'awaiting_payment',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

enum OrderStatus {
  ALL = 'Tất cả',
  CANCELED = 'Đã huỷ',
  UNCONFIRMED = 'Chưa xác nhận',
  CONFIRMED = 'Đã xác nhận',
  SHIPPING = 'Đang giao hàng',
  SUCCESS = 'Giao hàng thành công'
}

const NavBarOrder: FunctionComponent<Props> = ({ status, onChange }) => {
  return (
    <div className="bg-white">
      <div>
        <div className="text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px leading-4">
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                  'border-[#0d5cb6] text-[#0d5cb6]': status === OrderStatus.ALL,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== Status.ALL
                })}
                onClick={() => onChange(Status.ALL)}
              >
                Tất cả
              </div>
            </li>
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2 ', {
                  'border-[#0d5cb6] text-[#0d5cb6]':
                    status === Status.AWAITING_PAYMENT,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== Status.AWAITING_PAYMENT
                })}
                onClick={() => onChange(Status.AWAITING_PAYMENT)}
              >
                Chờ thanh toán
              </div>
            </li>
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                  'border-[#0d5cb6] text-[#0d5cb6]':
                    status === Status.PROCESSING,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== Status.PROCESSING
                })}
                onClick={() => onChange(Status.PROCESSING)}
              >
                Đang xử lý
              </div>
            </li>
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                  'border-[#0d5cb6] text-[#0d5cb6]':
                    status === OrderStatus.SHIPPING,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== OrderStatus.SHIPPING
                })}
                onClick={() => onChange(OrderStatus.SHIPPING)}
              >
                Đang vận chuyển
              </div>
            </li>
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                  'border-[#0d5cb6] text-[#0d5cb6]':
                    status === OrderStatus.SUCCESS,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== OrderStatus.SUCCESS
                })}
                onClick={() => onChange(OrderStatus.SUCCESS)}
              >
                Đã giao
              </div>
            </li>
            <li className="mr-2">
              <div
                className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                  'border-[#0d5cb6] text-[#0d5cb6]':
                    status === OrderStatus.CANCELED,
                  'hover:text-gray-600 hover:border-gray-300 border-transparent':
                    status !== OrderStatus.CANCELED
                })}
                onClick={() => onChange(OrderStatus.CANCELED)}
              >
                Đã huỷ
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBarOrder;
