import { Modal } from '@components/common/modal/Modal';
import { noop } from 'lodash';
import { FunctionComponent, useState } from 'react';
import AuthInput from './AuthInput';

const AuthModal: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | string[]>('');
  const [warning, setWarning] = useState<string | string[]>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, sePasswordError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="py-3 px-3"
      width={800}
      height={560}
      shadow="shadow-xl"
      rounded="rounded-md"
      onClose={onClose}
    >
      <div>
        <div className="shadow-lg bg-white rounded-lg p-6">
          <form onSubmit={noop}>
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
              value={phone}
              placeholder="Phone number"
              // icon={EnvelopeSimpleIcon}
              onChange={(e) => setPhone(e.target.value)}
            />

            <AuthInput
              isError={passwordError !== ''}
              message={passwordError}
              value={password}
              type="password"
              placeholder="Password"
              // icon={LockKeyIcon}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <div className="mt-6 flex items-center justify-between">
              <Link className="text-info text-sm" to="/forgot-password">
                Forgot password?
              </Link> */}
            {/* <AuthSubmitButton
                isLoading={isLoading}
                width={114}
                title="Login"
              /> */}
            {/* </div> */}
          </form>
        </div>
        {/* <div className="text-gray-800 text-center mt-4">
          New to {APP_NAME}?{' '}
          <Link to="/signup" className="cursor-pointer underline">
            Create an account
          </Link>
        </div> */}
      </div>

      {/* <div className="flex items-center justify-between h-9 px-2">
        <div className="flex items-center text-16 leading-5.5 font-semibold"></div>
        <div
          onClick={onClose}
          className="w-5 h-5 hover:bg-gray-100 text-gray-600 active:bg-gray-200 rounded flex justify-center items-center cursor-pointer"
        ></div>
      </div> */}
    </Modal>
  );
};

export default AuthModal;
