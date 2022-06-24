import LoadingOverlay from '@components/common/LoadingOverlay';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import axiosClient from 'utils/api';

const VerifyEmail: FunctionComponent = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const handleVerifyEmail = async () => {
    const token = router.query.token;
    await axiosClient.get(`auth/verify-email?token=${token}`);
    setSuccess(true);
  };
  useAsyncEffect(handleVerifyEmail, []);
  if (!success) return <LoadingOverlay />;
  return <div>Sucess</div>;
};

export default VerifyEmail;
