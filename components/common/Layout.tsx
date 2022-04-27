import Header from '@components/header';
import { FunctionComponent, ReactNode } from 'react';
type Props = {
  children: ReactNode;
  admin?: boolean;
};
const Layout: FunctionComponent<Props> = ({ children, admin = false }) => {
  return (
    <>
      {!admin && (
        <>
          <Header />
          <div className="pt-16"></div>
        </>
      )}
      {children}
    </>
  );
};

export default Layout;
