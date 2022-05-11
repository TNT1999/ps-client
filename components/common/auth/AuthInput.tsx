import { PropsSVG } from '@assets/icons';
import classNames from 'classnames';
import React, { FunctionComponent, ChangeEvent } from 'react';

const AuthInput: FunctionComponent<{
  type?: string;
  isError?: boolean;
  message?: string;
  value: string;
  placeholder: string;
  icon?: FunctionComponent<PropsSVG>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  message = '',
  isError = false,
  icon
}) => {
  const Icon = icon;
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute mt-4.5 ml-4.5 stroke-current text-gray-900" />
      )}
      <input
        value={value}
        onChange={onChange}
        name="email"
        type={type}
        className={classNames(
          'w-full block border h-11 placeholder-gray-600 text-gray-900 rounded focus:outline-none mt-5',
          {
            'border-gray-300 focus:border-primary': !isError,
            'border-danger-400': isError,
            'pl-10 pr-4': icon,
            'px-4': !icon
          }
        )}
        placeholder={placeholder}
      />
      {isError && <div className="text-danger-400 text-sm">{message}</div>}
    </div>
  );
};

export default AuthInput;
