import React, { FunctionComponent } from 'react';
import cx from 'classnames';

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};
const ToggleSwitch: FunctionComponent<Props> = ({
  checked,
  onChange,
  className
}) => (
  <div
    onClick={() => onChange(!checked)}
    className={cx(
      'w-9 h-6 rounded-full relative duration-200 cursor-pointer after:bg-white after:block after:absolute after:top-[0.125rem] after:rounded-[50%] after:shadow-[0_2px_6px_0_rgba(14, 30, 37, 0.2)] after:duration-[250ms] after:w-5 after:h-5 hover:after:shadow-[0_4px_8px_rgba(14,30,37,0.25)]',
      className,
      {
        'bg-[#00C2B2] after:left-[0.875rem]': checked,
        'bg-[#D3D6DF] after:left-[0.125rem]': !checked
      }
    )}
  ></div>
);

export default ToggleSwitch;
