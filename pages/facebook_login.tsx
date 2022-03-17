import LoadingOverlay from '@components/common/LoadingOverlay';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import axiosClient from 'utils/api';

const FacebookCallbackPage: FunctionComponent = () => {
  const router = useRouter();
  const handleRedirectFromFacebook = async () => {
    if (!window || !window.opener) {
      return window.close();
    }
    try {
      const code = router.query.code;
      const userData = await axiosClient.post('auth/facebook', {
        code
      });
      window.opener.handleThirdPartyLogin(userData);
    } catch (err) {
      window.opener.handleThirdPartyLoginError(err);
    } finally {
      window.close();
    }
  };
  useAsyncEffect(handleRedirectFromFacebook, [router]);
  return <LoadingOverlay />;
};

export default FacebookCallbackPage;
