import { OrderStatus } from '@types';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  status?: string;
  onChange: (status?: OrderStatus) => void;
};

const NavBarOrder: FunctionComponent<Props> = ({ status, onChange }) => {
  return (
    <div className="bg-white mb-3">
      <div className="text-center text-gray-500 border-b border-gray-200 select-none">
        <ul className="flex flex-wrap -mb-px leading-4 gap-x-1">
          <li className="flex-1">
            <div
              className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                'border-[#0d5cb6] text-[#0d5cb6]': status === undefined,
                'hover:text-gray-600 hover:border-gray-300 border-transparent':
                  status !== undefined
              })}
              onClick={() => onChange(undefined)}
            >
              Tất cả
            </div>
          </li>
          <li className="flex-1">
            <div
              className={classNames('cursor-pointer px-5 py-4 border-b-2 ', {
                'border-[#0d5cb6] text-[#0d5cb6]':
                  status === OrderStatus.WAIT_CONFIRMED,
                'hover:text-gray-600 hover:border-gray-300 border-transparent':
                  status !== OrderStatus.WAIT_CONFIRMED
              })}
              onClick={() => onChange(OrderStatus.WAIT_CONFIRMED)}
            >
              Chờ xác nhận
            </div>
          </li>
          <li className="flex-1">
            <div
              className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                'border-[#0d5cb6] text-[#0d5cb6]':
                  status === OrderStatus.PROCESSING,
                'hover:text-gray-600 hover:border-gray-300 border-transparent':
                  status !== OrderStatus.PROCESSING
              })}
              onClick={() => onChange(OrderStatus.PROCESSING)}
            >
              Đang xử lý
            </div>
          </li>
          <li className="flex-1">
            <div
              className={classNames('cursor-pointer px-5 py-4 border-b-2', {
                'border-[#0d5cb6] text-[#0d5cb6]':
                  status === OrderStatus.SHIPPING,
                'hover:text-gray-600 hover:border-gray-300 border-transparent':
                  status !== OrderStatus.SHIPPING
              })}
              onClick={() => onChange(OrderStatus.SHIPPING)}
            >
              Đang giao hàng
            </div>
          </li>
          <li className="flex-1">
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
          <li className="flex-1">
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
  );
};

export default NavBarOrder;
