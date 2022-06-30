import classNames from 'classnames';
import { FunctionComponent, memo, useState } from 'react';
import NavigationMenuItem from './NavigationMenuItem';
import {
  CartIcon,
  ChevronRightIcon,
  UsersIcon,
  TruckIcon,
  ProductIcon,
  SettingIcon,
  BarChartIcon,
  EditIcon,
  ImageIcon,
  OrderIcon
} from '@assets/icons';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

type Props = any;
const NavigationMenu: FunctionComponent<Props> = memo(() => {
  const [collapsedLocalStorage, setCollapsedLocalStorage] = useLocalStorage(
    'collapsedSideBar',
    false
  );
  const toggleCollapse = () => {
    setCollapsedLocalStorage(!collapsedLocalStorage);
  };

  const router = useRouter();
  return (
    <div
      className={classNames(
        'flex flex-col pt-12 bg-white overflow-x-hidden overflow-y-auto transition-[width] ease-in-out relative shadow-header',
        {
          'duration-200 w-14': collapsedLocalStorage,
          'duration-[250] w-[17rem]': !collapsedLocalStorage
        }
      )}
    >
      <div id="nav_top" className="flex-1">
        {/* <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Dashboard"
          icon={EditIcon}
          active={router.route === ''}
        /> */}
        <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Sản phẩm"
          icon={ProductIcon}
          active={router.route.includes('/dashboard/product')}
          onClick={() => router.push('/dashboard/product')}
        />
        <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Người dùng"
          icon={UsersIcon}
          active={router.route.includes('/dashboard/user')}
          onClick={() => router.push('/dashboard/user')}
        />
        <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Đơn hàng"
          icon={CartIcon}
          active={router.route.includes('/dashboard/order')}
          onClick={() => router.push('/dashboard/order')}
        />
        {/* <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Shipping"
          icon={TruckIcon}
        />
        <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Media" 
          icon={ImageIcon}
        /> */}
      </div>
      <div id="nav_bottom">
        {/* <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Thống kê"
          icon={BarChartIcon}
        />
        <NavigationMenuItem
          collapsed={collapsedLocalStorage}
          label="Cài đặt"
          icon={SettingIcon}
        /> */}
        <NavigationMenuItem
          control
          className="w-14"
          collapsed={collapsedLocalStorage}
          icon={ChevronRightIcon}
          onClick={toggleCollapse}
        />
      </div>
    </div>
  );
});

NavigationMenu.displayName = 'menu';
export default NavigationMenu;
