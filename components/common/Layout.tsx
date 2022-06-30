import { RootState } from '@app/store';
import { BellIcon } from '@assets/icons';
import Header from '@components/header';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserAvatar from './Avatar';
import Logo from '../../public/assets/images/Logo.png';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
// const ENDPOINT = 'https://socket-22-2.herokuapp.com';
const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT, { transports: ['websocket'] });

type Props = {
  children: ReactNode;
  admin?: boolean;
};
const HeaderAdmin: FunctionComponent<any> = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    socket.on('newOrder_admin', (res) => {
      toast.success('Bạn có 1 đơn hàng mới');
    });
    socket.on('cancelOrder_admin', (orderId) => {
      toast.warn(`Đơn hàng ${orderId} vừa được huỷ`);
    });
    if (user?.id) {
      console.log('emit connected');
      socket.emit('connected', user?.id);
    }
    return () => {
      socket.off('newOrder_admin');
      socket.off('cancelOrder_admin');
    };
  }, [user]);

  return (
    <header className="w-full h-14 md:h-16 py-3 pr-4 sm:pr-8 fixed inset-x-0 top-0 bg-white shadow-header z-20">
      <nav className="flex h-full justify-between">
        <div className="flex flex-1 items-center ">
          <div className="relative flex flex-1 items-center pl-4 pr-8">
            <img className="h-12 left-0 px-3 py-2 -ml-3" alt="" src={Logo} />
            <h2 className="text-xl font-medium">CellPhones</h2>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          {user && (
            <>
              {/* <span>
                <BellIcon className="mr-6" />
              </span> */}
              <UserAvatar
                name={user?.name}
                avatar="https://randomuser.me/api/portraits/men/1.jpg"
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const Layout: FunctionComponent<Props> = ({ children, admin = false }) => {
  return (
    <>
      {
        <>
          {admin ? <HeaderAdmin /> : <Header />}
          <div className="md:pt-16 pt-14"></div>
        </>
      }
      {children}
    </>
  );
};

export default Layout;
