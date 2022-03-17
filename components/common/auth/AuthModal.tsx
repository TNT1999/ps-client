import { KeyIcon, MailIcon } from '@assets/icons';
import { Modal } from '@components/common/modal/Modal';
import { noop } from 'lodash';
import Link from 'next/link';
import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import Divider from '@components/common/divider';
import AuthInput from './AuthInput';
import AuthSubmitButton from './AuthSubmitButton';
import PasswordInput from './PasswordInput';
import SocialLogin from './SocialLogin';
import { userData } from 'app/slice';

declare global {
  interface Window {
    handleThirdPartyLogin: (userData: userData) => void;
    handleThirdPartyLoginError: (error: string) => void;
  }
}
const AuthModal: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | string[]>('');
  const [warning, setWarning] = useState<string | string[]>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, sePasswordError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => sePasswordError(''), [password]);

  const resetMessage = () => {
    setError('');
    setWarning('');
  };
  const LoginWithEmail = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    console.log(email, password);
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
              <Link href="/forgot-password">
                <a className="text-info text-sm">Quên mật khẩu?</a>
              </Link>
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
