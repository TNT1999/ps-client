import { NotificationType, OrderStatus } from '@types';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  status?: string;
  onChange: (status?: NotificationType) => void;
};

const NavBarNotification: FunctionComponent<Props> = ({ status, onChange }) => {
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
                  status === NotificationType.ORDER,
                'hover:text-gray-600 hover:border-gray-300 border-transparent':
                  status !== NotificationType.ORDER
              })}
              onClick={() => onChange(NotificationType.ORDER)}
            >
              Chờ xác nhận
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarNotification;
