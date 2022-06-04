import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import dayjs from '@utils/dayjs';
import { FunctionComponent } from 'react';
import { PropsSVG, ShippingIcon } from '@assets/icons';
type Props = {
  method: any;
  isSelected: boolean;
  handleSelect: (option) => void;
  icon: FunctionComponent<PropsSVG>;
  iconClassName?: string;
};
const PaymentMethodItem: FunctionComponent<Props> = ({
  method,
  isSelected,
  handleSelect,
  icon,
  iconClassName
}) => {
  const Icon = icon;
  return (
    <div
      className={classNames('flex p-3 pl-2 mb-3', {
        // 'border-[#dadada]': !isSelected,
        // 'border-[#c2e1ff] bg-[#f0f8ff]': isSelected
      })}
      onClick={handleSelect}
    >
      <div className="flex cursor-pointer">
        <div className="mr-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classNames('w-6 h-6', {
              'text-gray-300': !isSelected,
              'text-blue-600': isSelected
            })}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="text-13">
          <div className="flex items-center text-black">
            <Icon className={classNames('mr-3', iconClassName)} />
            <span>{method}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentMethodItem;
