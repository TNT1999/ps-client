import { EyeIcon, EyeOffIcon, Props } from '@assets/icons';
import classNames from 'classnames';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { isEmpty } from 'utils/string';

const PasswordInput: FunctionComponent<{
  password: string;
  errorMessage: string;
  placeholder: string;
  icon: FunctionComponent<Props>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ password, errorMessage, placeholder, icon, onChange }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const Icon = icon;
  return (
    <>
      <div className="relative">
        <Icon className="absolute mt-4.5 ml-4.5 stroke-current text-gray-900" />
        <input
          placeholder={placeholder}
          className={classNames(
            'w-full px-10 block border h-11 placeholder-gray-600 text-gray-900 rounded focus:outline-none mt-5',
            {
              'border-gray-300 focus:border-primary': isEmpty(errorMessage),
              'border-danger-400': !isEmpty(errorMessage)
            }
          )}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange}
        />
        {showPassword ? (
          <div
            className="absolute h-6 w-6 text-gray-300 cursor-pointer select-none right-3 top-1/2 flex items-center justify-center transform -translate-y-1/2"
            onClick={() => {
              setShowPassword(false);
            }}
          >
            <EyeOffIcon className="w-4 h-4 cursor-pointer text-gray-700 stroke-current" />
          </div>
        ) : (
          <div
            className="absolute h-6 w-6 text-gray-300 cursor-pointer select-none right-3 top-1/2 flex items-center justify-center transform -translate-y-1/2"
            onClick={() => {
              setShowPassword(true);
            }}
          >
            <EyeIcon className="w-4 h-4 cursor-pointer text-gray-700 stroke-current" />
          </div>
        )}
      </div>
      {!isEmpty(errorMessage) && (
        <div className="text-10 leading-3.5 text-danger-500 mt-1 ml-0.5">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default PasswordInput;
