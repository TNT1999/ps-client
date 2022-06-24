import { FunctionComponent } from 'react';
import cx from 'classnames';
type Props = {
  noBorder?: boolean;
  control?: boolean;
  label?: string;
  focus?: boolean;
  labelTarget?: string;
  onClick: any;
};
const Field: FunctionComponent<Props> = ({
  noBorder,
  control,
  label,
  children,
  focus,
  labelTarget,
  onClick
}) => {
  const clickable = !!onClick;
  return (
    <div
      className={cx('p-4 relative', {
        'shadow-field': noBorder
      })}
    >
      <div
        className={cx('m-auto my-0 relative', {
          'cursor-pointer': clickable,
          'flex items-center': control
        })}
        onClick={onClick}
      >
        {label && (
          <label
            htmlFor={labelTarget}
            className={cx(
              'block text-xs -mt-1 mb-1 font-semibold  duration-200',
              {
                'cursor-pointer': clickable,
                'flex-1 m-0': control,
                'text-[#00C2B2]': focus,
                'text-[#8F97A6]': !focus
              }
            )}
          >
            {label}
          </label>
        )}
        {children}
      </div>
      {!noBorder && (
        <div
          className={cx(
            ' absolute bottom-0 inset-x-0 duration-200 bg-[#00C2B2]',
            {
              'h-[2px] scale-x-100': focus,
              'h-[1px] scale-x-0': !focus
            }
          )}
        ></div>
      )}
    </div>
  );
};

export default Field;
