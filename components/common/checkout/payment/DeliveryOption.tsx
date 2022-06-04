import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import dayjs from '@utils/dayjs';
import { FunctionComponent } from 'react';
import { ShippingIcon } from '@assets/icons';
type Props = {
  option?: any;
  isSelected?: boolean;
  handleSelect?: () => void;
  loading?: boolean;
};
const DeliveryOption: FunctionComponent<Props> = ({
  option,
  isSelected,
  handleSelect,
  loading
}) => {
  return (
    <div
      className={classNames(
        'flex flex-col flex-1/3 p-3 pl-2 rounded-md cursor-pointer',
        {
          'border-[#dadada] border': !isSelected && !loading,
          'border-[#c2e1ff] bg-[#f0f8ff] border': isSelected && !loading,
          'animate-pulse border border-zinc-200': loading
        }
      )}
      onClick={handleSelect}
    >
      <div className="flex">
        <div className="mr-3">
          {!loading ? (
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
          ) : (
            <div className="w-6 h-6 rounded-full bg-zinc-200"></div>
          )}
        </div>
        <div className="text-base flex-1">
          <div className="flex flex-col text-black">
            <p
              className={classNames('text-13 font-medium', {
                'h-6 w-2/4 rounded-md bg-zinc-200 py-0.5 bg-clip-content':
                  loading
              })}
            >
              {!loading && formatMoney(option.total)}
            </p>
            <p
              className={classNames('my-2 flex', {
                'h-6 w-4/5 rounded-md bg-zinc-200 py-0.5 bg-clip-content':
                  loading
              })}
            >
              {!loading && (
                <>
                  <span>Giao hàng tiêu chuẩn</span>
                  <ShippingIcon className="ml-2" />
                </>
              )}
            </p>
            <p
              className={classNames('text-[#00ab56]', {
                'h-6 w-11/12 rounded-md bg-zinc-200 py-0.5 bg-clip-content':
                  loading
              })}
            >
              {!loading && (
                <>
                  Giao vào{' '}
                  <span className="capitalize">
                    {dayjs.unix(option.leadtime).format('dddd, DD/MM')}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeliveryOption;
