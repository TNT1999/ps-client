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
        'flex py-3 flex-col bg-white relative overflow-x-hidden overflow-y-auto transition-[width] ease-in-out shadow-navigation',
        {
          'duration-200 w-14': collapsed,
          'duration-[250] w-60': !collapsed
        }
      )}
    >
      <div id="nav_top" className="flex-1">
        {/* <NavigationMenuItem
          collapsed={collapsed}
          label="Add Product"
          icon={EditIcon}
          active={router.route === ''}
        /> */}
        <NavigationMenuItem
          collapsed={collapsed}
          label="Product"
          icon={ProductIcon}
          onClick={() => router.push('/dashboard/product')}
          active={router.route === '/dashboard/product'}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Users"
          icon={UsersIcon}
          active={router.route === '/dashboard/user'}
          onClick={() => router.push('/dashboard/user')}
        />
        <NavigationMenuItem
          collapsed={collapsed}
          label="Order"
          icon={OrderIcon}
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
