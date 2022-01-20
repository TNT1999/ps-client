import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/solid';

const UserDropdown: React.FC<any> = (props: any) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="justify-center py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <div className="flex items-center pl-2">
          <UserCircleIcon className="h-5 sm:h-6 text-gray-700 px-1" />
          <span className="max-w-name-user text-sm hidden truncate flex-auto md:block text-gray-800">
            Trần Nguyên Tài
          </span>
          <ChevronDownIcon
            className="hidden md:block md:h-4 text-gray-500 pl-1"
            aria-hidden="true"
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-12 md:top-14 min-w-max bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-blue-100'
                  } focus:outline-none group flex rounded items-center w-full px-2 py-2 text-sm`}
                >
                  Thông tin tài khoản
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-blue-100'
                  } focus:outline-none group flex rounded items-center w-full px-2 py-2 text-sm`}
                >
                  Đơn hàng của tôi
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-blue-100'
                  } focus:outline-none group flex rounded items-center w-full px-2 py-2 text-sm`}
                >
                  Đăng xuất
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
