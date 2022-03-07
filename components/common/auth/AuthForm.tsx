import React, { FunctionComponent, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { AuthFormBackgroundImage, LogoImage } from 'assets/images';
// import useAuth from 'contexts/useAuth';

const AuthForm: FunctionComponent = ({ children }) => {
  // const { user } = useAuth();
  // const history = useHistory();

  // useEffect(() => {
  //   if (user) {
  //     history.push('/projects');
  //   }
  // }, [history, user]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-6 bg-cover"
      // style={{ backgroundImage: `url(${AuthFormBackgroundImage})` }}
    >
      <div className="max-w-120 w-full">
        <div className="flex items-center mx-auto justify-center mb-3">
          {/* <img src={LogoImage} alt="" /> */}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthForm;
