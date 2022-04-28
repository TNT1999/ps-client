import { userData } from '@app/slice';
import LoadingOverlay from '@components/common/LoadingOverlay';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import axiosClient from 'utils/api';

const GoogleCallbackPage: FunctionComponent = () => {
  const router = useRouter();
  const handleRedirectFromGoogle = async () => {
    if (!window || !window.opener) {
      return window.close();
    }
    try {
      const code = router.query.code;
      const userData: userData = await axiosClient.post('auth/google', {
        code
      });
      console.log(userData);
      window.opener.handleThirdPartyLogin(userData);
    } catch (err) {
      window.opener.handleThirdPartyLoginError(err);
    } finally {
      window.close();
    }
  };
  useAsyncEffect(handleRedirectFromGoogle, [router]);
  return <LoadingOverlay />;
};

export default GoogleCallbackPage;
