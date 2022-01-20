import React from 'react';
import Link from 'next/link';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import UserDropdown from './UserDropdown';
import SearchWithDropDown from './SearchWithDropdown';

interface IProps {
  cartNumber?: number;
}
const Header: React.FC<IProps> = ({ cartNumber = 0 }) => {
  return (
    <header className="w-full h-14 md:h-16 py-3 px-4 sm:px-8 shadow-header fixed inset-x-0 top-0">
      <nav className="flex h-full justify-between">
        <div className="flex flex-4 items-center ">
          <div className="relative flex flex-1 items-center pl-4 pr-8">
            <Link href="/dien-thoai">
              <a className="font-bold text-blue-600 text-sm sm:text-sm md:text-lg lg:text-2xl italic">
                CellPhones
              </a>
            </Link>
            <img
              className="h-12 sm:h-12 md:h-14 lg:h-16 absolute left-0"
              src="https://static.wixstatic.com/media/84770f_f1972fc2e2bd4ea9b339ada1691a8a55~mv2.gif"
            />
          </div>

          <SearchWithDropDown className="flex-3" />

          <div className="sm:flex-1 lg:flex-2"></div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <UserDropdown />
          <div className="pl-2 relative">
            <Link href="/gio-hang">
              <a>
                <ShoppingCartIcon className="h-5 sm:h-6 text-gray-700 hover:text-blue-400" />
              </a>
            </Link>
            <span
              className="flex items-center justify-center text-xs px-1 
                absolute min-w-badge top-0 right-0 h-5 rounded-xl origin-top-right 
                text-gray-700 transform scale-100	translate-x-1/2	-translate-y-1/2 bg-blue-300"
            >
              {cartNumber}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
