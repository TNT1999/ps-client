import { FunctionComponent } from 'react';
import cx from 'classnames';
type Props = {
  className?: string;
  size?: 'sm';
  transparent?: boolean;
  type?: string;
  [key: string]: unknown;
};
const Button: FunctionComponent<Props> = ({
  children,
  className,
  size,
  transparent,
  type,
  ...other
}) => {
  return (
    <button
      className={cx(
        'cursor-pointer text-center border-0 outline-0 duration-200 whitespace-nowrap font-semibold bg-[#00C2B2]',
        className,
        {
          'text-xs px-2 leading-6 rounded': size === 'sm',
          'text-sm px-3 leading-8 rounded-md': size !== 'sm',
          '!bg-transparent': transparent
        }
      )}
      {...other}
    >
      {children}
    </button>
  );
};
export default Button;
