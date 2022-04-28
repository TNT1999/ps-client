// import Tooltip from '@components/common/Tooltip';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
type Props = any;
const NavigationMenuItem: FunctionComponent<Props> = ({
  icon,
  label,
  collapsed,
  active,
  onClick,
  className,
  control,
  tooltip,
  ...props
}) => {
  const Icon = icon;
  return (
    <div
      className={classNames(
        'w-full flex px-3 cursor-pointer items-center h-10 group',
        className
      )}
      onClick={onClick}
    >
      <a
        className={classNames(
          'flex items-center w-full overflow-hidden border-0 h-8 outline-none duration-200 rounded-md',
          {
            'text-[#00AD9E]  group-hover:bg-[#00ad9e33] bg-[#00ad9e1a]': active,
            'text-[#616C7A] bg-transparent group-hover:text-[#0E1E25] group-hover:bg-[#0e1e250d]':
              !active
          }
        )}
      >
        <span className="flex items-center w-[13.5rem] min-w-[13.5rem] text-[#616c7a]">
          <Icon
            className={classNames('h-5 w-5 text-gray-700 m-[0.4375rem]', {
              'duration-200': control,
              'rotate-0': control && collapsed,
              'rotate-180': control && !collapsed
            })}
          />
          <span
            className={classNames(
              'flex flex-1 overflow-hidden font-semibold text-sm duration-200 ml-3 select-none',
              {
                'opacity-0': collapsed,
                'opacity-100': !collapsed
              }
            )}
          >
            {label}
          </span>
        </span>
      </a>
    </div>
  );
};

export default NavigationMenuItem;
