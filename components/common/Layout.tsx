import { RootState } from '@app/store';
import { BellIcon } from '@assets/icons';
import Header from '@components/header';
import UserDropdown from '@components/header/UserDropdown';
import { FunctionComponent, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import UserAvatar from './Avatar';
type Props = {
  children: ReactNode;
  admin?: boolean;
};
const HeaderAdmin: FunctionComponent<any> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <header className="w-full h-14 md:h-16 py-3 px-4 sm:px-8 fixed inset-x-0 top-0 bg-white">
      <nav className="flex h-full justify-between max-w-screen-xl m-auto px-4">
        <div className="flex flex-4 items-center ">
          <div className="relative flex flex-1 items-center pl-4 pr-8">
            {/* <Link href="/dien-thoai">
              <a className="font-bold text-primary text-sm sm:text-sm md:text-lg lg:text-2xl italic text-white">
                CellPhones
              </a>
            </Link> */}

            {/* <img
              className="h-12 sm:h-12 md:h-14 lg:h-16 absolute left-0"
              alt=""
              src="https://static.wixstatic.com/media/84770f_f1972fc2e2bd4ea9b339ada1691a8a55~mv2.gif"
            /> */}
          </div>

          {/* <SearchWithDropDown className="flex-3" /> */}

          <div className="sm:flex-1 lg:flex-2"></div>
        </div>
        <div className="flex flex-1 items-center justify-end pr-5">
          {user && (
            <>
              <span>
                <BellIcon className="mr-8" />
              </span>
              <UserAvatar
                name={user?.name}
                avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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
