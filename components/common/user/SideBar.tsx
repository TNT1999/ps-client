import {
  BellIcon,
  MapPinIcon,
  OrderIcon,
  ReviewIcon,
  UserIcon
} from '@assets/icons';
import classNames from 'classnames';
import Link from 'next/link';
import { FunctionComponent } from 'react';

type Props = {
  active?: 'profile' | 'order' | 'address' | 'notification' | 'review';
};
const SideBar: FunctionComponent<Props> = ({ active }) => {
  return (
    <div className="w-64 mr-4">
      <ul className="list-none m-0 p-0 text-13">
        <li>
          <Link href={'/user/profile'}>
            <a
              className={classNames(
                ' flex items-center py-3 px-5 text-[#4a4a4a] hover:opacity-95 hover:bg-[#ebebf0] hover:text-black rounded',
                {
                  'bg-[#ebebf0] !text-black': active === 'profile'
                }
              )}
            >
              <UserIcon className="text-current w-6 h-6 mr-6" />
              <span>Thông tin tài khoản</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href={'/user/notification'}>
            <a
              className={classNames(
                ' flex items-center py-3 px-5 text-[#4a4a4a] hover:opacity-95 hover:bg-[#ebebf0] hover:text-black rounded',
                {
                  'bg-[#ebebf0] !text-black': active === 'notification'
                }
              )}
            >
              <BellIcon className="text-current w-6 h-6 mr-6" />
              <span>Thông báo của tôi</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href={'/user/order'}>
            <a
              className={classNames(
                ' flex items-center py-3 px-5 text-[#4a4a4a] hover:opacity-95 hover:bg-[#ebebf0] hover:text-black rounded',
                {
                  'bg-[#ebebf0] !text-black': active === 'order'
                }
              )}
            >
              <OrderIcon className="text-current w-6 h-6 mr-6" />
              <span>Quản lý đơn hàng</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href={'/user/address'}>
            <a
              className={classNames(
                ' flex items-center py-3 px-5 text-[#4a4a4a] hover:opacity-95 hover:bg-[#ebebf0] hover:text-black rounded',
                {
                  'bg-[#ebebf0] !text-black': active === 'address'
                }
              )}
            >
              <MapPinIcon className="text-current w-6 h-6 mr-6" />
              <span>Địa chỉ</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={'/user/review'}>
            <a
              className={classNames(
                ' flex items-center py-3 px-5 text-[#4a4a4a] hover:opacity-95 hover:bg-[#ebebf0] hover:text-black rounded',
                {
                  'bg-[#ebebf0] !text-black': active === 'review'
                }
              )}
            >
              <ReviewIcon className="text-current w-6 h-6 mr-6" />
              <span>Nhận xét của tôi</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
