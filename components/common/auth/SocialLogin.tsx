import { FacebookIcon, GoogleIcon } from '@assets/icons';
import { nanoid } from '@reduxjs/toolkit';
import { login } from 'app/slice';
import { useAppDispatch } from 'app/store';
import { FunctionComponent } from 'react';
import { noop } from 'utils';

const SocialLogin: FunctionComponent<{
  setPending?: (state: boolean) => void;
  setWarning?: (state: string) => void;
  resetMessage?: () => void;
  onClose: () => void;
}> = ({
  setWarning = noop,
  setPending = noop,
  resetMessage = noop,
  onClose
}) => {
  const dispatch = useAppDispatch();
  window.handleThirdPartyLogin = (userData) => {
    dispatch(login(userData));
    onClose();
  };

  // window.handleThirdPartyLoginError = (error) => {
  //   if (error === AuthError.NONE_WHITELISTED_MESSAGE) {
  //     setPending(true);
  //   } else {
  //     setWarning(error);
  //   }
  // };

  const getPopupOptions = () => {
    const left = (window.innerWidth - 480) / 2;
    const top = (window.innerHeight - 640) / 2;
    return `width=480,height=640,menubar=0,resizable=0,toolbar=0,left=${left},top=${top}`;
  };

  const loginWithGoogle = () => {
    resetMessage();

    const googleAuthBaseURL =
      'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount';
    const url = new URL(googleAuthBaseURL);
    const params = url.searchParams;
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    params.append('response_type', 'code');
    params.append('client_id', GOOGLE_CLIENT_ID);
    params.append('access_type', 'offline');
    params.append('approval_prompt', 'auto');
    params.append('flowName', 'GeneralOAuthFlow');
    params.append('redirect_uri', `${location.origin}/google_login`);
    params.append(
      'scope',
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    );

    window.open(url.toString(), '', getPopupOptions());
  };

  const loginWithFacebook = () => {
    resetMessage();
    const facebookAuthBaseURL = 'https://www.facebook.com/v13.0/dialog/oauth';
    const url = new URL(facebookAuthBaseURL);
    const params = url.searchParams;
    const FB_CLIENT_ID = process.env.NEXT_PUBLIC_FB_CLIENT_ID || '';
    params.append('client_id', FB_CLIENT_ID);
    params.append('redirect_uri', `${location.origin}/facebook_login`);
    window.open(url.toString(), '', getPopupOptions());
  };

  return (
    <div className="flex justify-center gap-6">
      <button
        type="button"
        onClick={loginWithGoogle}
        className="relative cursor-pointer flex justify-center items-center border-transparent font-bold rounded-md focus:outline-none active:outline-none h-12 w-12 hover:bg-gray-200"
      >
        <GoogleIcon className="h-9 w-9" />
      </button>
      <button
        type="button"
        onClick={loginWithFacebook}
        className="relative cursor-pointer flex justify-center items-center border-transparent font-bold rounded-md focus:outline-none active:outline-none h-12 w-12 hover:bg-gray-200"
      >
        <FacebookIcon />
      </button>
    </div>
  );
};

export default SocialLogin;
