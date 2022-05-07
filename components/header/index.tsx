import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import SearchWithDropDown from './SearchWithDropdown';
import AuthModal from '@components/common/auth/AuthModal';
import { CartIcon } from '@assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { isEmpty } from 'lodash';

type Props = any;
const Header: FunctionComponent<Props> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  return (
    <header className="w-full h-14 md:h-16 py-3 px-4 sm:px-8 shadow-header fixed inset-x-0 top-0 bg-bluePrimary">
      <nav className="flex h-full justify-between max-w-screen-xl m-auto px-4">
        <div className="flex flex-4 items-center ">
          <div className="relative flex flex-1 items-center pl-4 pr-8">
            <Link href="/dien-thoai">
              <a className="font-bold text-primary text-sm sm:text-sm md:text-lg lg:text-2xl italic text-white">
                CellPhones
              </a>
            </Link>

            {/* <img
              className="h-12 sm:h-12 md:h-14 lg:h-16 absolute left-0"
              alt=""
              src="https://static.wixstatic.com/media/84770f_f1972fc2e2bd4ea9b339ada1691a8a55~mv2.gif"
            /> */}
          </div>

          <SearchWithDropDown className="flex-3" />

          <div className="sm:flex-1 lg:flex-2"></div>
        </div>
        <div className="flex flex-1 items-center justify-end pr-5">
          {user ? (
            <UserDropdown name={user?.name} />
          ) : (
            <>
              <button
                className="text-sm text-white"
                onClick={() => setAuthModalVisible(true)}
              >
                <span>Đăng nhập</span>
                <span> | </span>
                <span>Đăng ký</span>
              </button>
              {authModalVisible && (
                <AuthModal onClose={() => setAuthModalVisible(false)} />
              )}
            </>
          )}
          <div className="pl-4 relative">
            <Link href="/gio-hang">
              <a>
                <CartIcon className="h-5 sm:h-6 text-white" />
              </a>
            </Link>
            <span
              className="flex items-center justify-center text-xs px-1 pointer-events-none	
                absolute min-w-badge top-0 right-0 h-5 rounded-xl origin-top-right
                text-[#242424] transform scale-100	translate-x-1/2	-translate-y-1/2 bg-[#fdd835]"
            >
              {cart.count}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
