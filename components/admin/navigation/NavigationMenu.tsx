import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
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
type Props = any;
const NavigationMenu: FunctionComponent<Props> = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  return (
    <div
      className={classNames(
        'flex pt-6 pb-3 flex-col bg-white overflow-x-hidden overflow-y-auto transition-[width] ease-in-out fixed bottom-0 md:top-16 top-14',
        {
          'duration-200 w-14': collapsed,
          'duration-[250] w-60': !collapsed
        }
      )}
    >
      <div id="nav_top" className="flex-1">
        <NavigationMenuItem
          collapsed={collapsed}
          label="Dashboard"
          icon={EditIcon}
          active={router.route === ''}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Product"
          icon={ProductIcon}
          active={router.route.includes('/dashboard/product')}
          onClick={() => router.push('/dashboard/product')}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Users"
          icon={UsersIcon}
          active={router.route.includes('/dashboard/user')}
          onClick={() => router.push('/dashboard/user')}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Order"
          icon={OrderIcon}
          active={router.route.includes('/dashboard/order')}
          onClick={() => router.push('/dashboard/order')}
        />
        {/* <NavigationMenuItem
          collapsed={collapsed}
          label="Shipping"
          icon={TruckIcon}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Media" 
          icon={ImageIcon}
        /> */}
      </div>
      <div id="nav_bottom">
        <NavigationMenuItem
          collapsed={collapsed}
          label="Analytics"
          icon={BarChartIcon}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Setting"
          icon={SettingIcon}
        />
        <NavigationMenuItem
          control
          className="w-14"
          collapsed={collapsed}
          icon={ChevronRightIcon}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </div>
  );
};

export default NavigationMenu;
