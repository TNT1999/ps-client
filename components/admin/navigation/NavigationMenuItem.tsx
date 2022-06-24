// import Tooltip from '@components/common/Tooltip';
import Tooltip from '@components/common/Tooltip';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
type Props = any;
const NavigationMenuItem: FunctionComponent<Props> = ({
  icon,
  label,
  collapsed,
  active,
  onClick,
  className,
  control,
  ...props
}) => {
  const Icon = icon;
  const [visibleTooltip, setVisibleTooltip] = useState(false);
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
            'text-white  group-hover:bg-[#5f47cc]  bg-[#5842be]': active,
            'text-[#616C7A] bg-transparent group-hover:text-[#0E1E25] group-hover:bg-[#0e1e250d]':
              !active
          }
        )}
      >
        <span className="flex items-center w-[13.5rem] min-w-[13.5rem]">
          <Tippy
            visible={collapsed && visibleTooltip && label}
            arrow={true}
            placement={'right'}
            content={<Tooltip text={label} />}
            delay={100}
          >
            <span>
              <Icon
                onMouseEnter={() => setVisibleTooltip(true)}
                onMouseLeave={() => setVisibleTooltip(false)}
                className={classNames('h-5 w-5 currentColor m-[0.4375rem]', {
                  'duration-200': control,
                  'rotate-0': control && collapsed,
                  'rotate-180': control && !collapsed
                })}
              />
            </span>
          </Tippy>
          <span
            className={classNames(
              'flex flex-1 overflow-hidden font-medium text-sm duration-200 ml-3 select-none',
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
