import { KeyIcon, MailIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { noop } from 'lodash';
import Link from 'next/link';
import { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import Divider from '@components/common/Divider';
import AuthInput from './AuthInput';
import AuthSubmitButton from './AuthSubmitButton';
import PasswordInput from './PasswordInput';
import SocialLogin from './SocialLogin';
import { login, UserData } from 'app/slice';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'app/store';
import { isEmpty } from 'utils/string';
import axiosClient from 'utils/api';

export const EMPTY_FIELD_ERROR = 'Please fill out this field';
declare global {
  interface Window {
    handleThirdPartyLogin: (userData: UserData) => void;
    handleThirdPartyLoginError: (error: string) => void;
  }
}
const AuthModal: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | string[]>('');
  const [warning, setWarning] = useState<string | string[]>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPasswordError(''), [password]);

  const resetMessage = () => {
    setError('');
    setWarning('');
  };
  const LoginWithEmail = async (e: FormEvent) => {
    e.preventDefault();
    resetMessage();
    if (isEmpty(email)) {
      setEmailError(EMPTY_FIELD_ERROR);
    }
    if (isEmpty(password)) {
      setPasswordError(EMPTY_FIELD_ERROR);
    }
    if (isEmpty(email) || isEmpty(password)) {
      return;
    }
    setLoading(true);
    try {
      const user: UserData = await axiosClient.post('/auth/login', {
        email,
        password
      });
      dispatch(login(user));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const forgetPassword = () => {
    router.push('/forgot-password', undefined, { shallow: true });
  };
  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="py-3 px-3"
      width={800}
      // height={460}
      shadow="shadow-xl"
      rounded="rounded-xl"
      onClose={onClose}
    >
      <div className="flex">
        <div className="bg-white rounded-lg p-6 flex-1">
          <div className="flex justify-center my-5">
            <div className="text-3xl font-bold leading-10">Đăng nhập</div>
          </div>
          <form onSubmit={LoginWithEmail}>
            {/* {error && (
              <ErrorMessage error={error} onClear={() => setError('')} />
            )}
            {warning && (
              <WarningMessage
                warning={warning}
                onClear={() => setWarning('')}
              />
            )} */}

            {/* <SocialLogin
              resetMessage={resetMessage}
              setPending={setPending}
              setWarning={setWarning}
            /> */}

            <AuthInput
              isError={emailError !== ''}
              message={emailError}
              value={email}
              placeholder="Email"
              icon={MailIcon}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              errorMessage={passwordError}
              password={password}
              placeholder="Password"
              icon={KeyIcon}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-3 flex flex-col items-end justify-between">
              <div onClick={forgetPassword}>
                <a className="text-info text-sm">Quên mật khẩu?</a>
              </div>
              <AuthSubmitButton
                isLoading={isLoading}
                width="100%"
                title="Đăng nhập"
              />
            </div>
          </form>
          <Divider text="Hoặc tiếp tục bằng" />
          <SocialLogin onClose={onClose} />
          <div className="text-opacity-90 text-center mt-6 text-gray-800 text-sm">
            Chưa có tài khoản?{' '}
            <Link href="/signup">
              <a className="text-info text-sm cursor-pointer underline font-bold text-opacity-100">
                Tạo tài khoản
              </a>
            </Link>
          </div>
        </div>
        <div
          className="flex items-center bg-[#f0f8ff] rounded-r-xl"
          style={{ width: '300px' }}
        >
          <img className="mb-9" src="/assets/images/login_bg.png" alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
