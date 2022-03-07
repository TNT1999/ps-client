import classNames from 'classnames';
import React, { FunctionComponent, ChangeEvent } from 'react';

const AuthInput: FunctionComponent<{
  type?: string;
  isError?: boolean;
  message?: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  message = '',
  isError = false
}) => {
  return (
    <div>
      {/* <Icon className="absolute mt-3 ml-3 stroke-current text-gray-900" /> */}
      <input
        value={value}
        onChange={onChange}
        name="email"
        type={type}
        className={classNames(
          'w-full pl-12 block border-2 h-12 placeholder-gray-600 text-gray-900 rounded-md focus:outline-none mt-4',
          {
            'border-gray-300 focus:border-primary': !isError,
            'border-danger-400': isError
          }
        )}
        placeholder={placeholder}
      />
      {isError && <div className="text-danger-400 text-sm">{message}</div>}
    </div>
  );
};

export default AuthInput;
