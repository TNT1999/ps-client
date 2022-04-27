import { MinusIcon, PlusIcon } from '@assets/icons';
import classNames from 'classnames';
import { values } from 'lodash';
import isNaN from 'lodash/isNaN';
import { FunctionComponent } from 'react';
type Props = {
  type?: 'sm' | 'md';
  value: string;
  onChange: (value: string | number) => void;
  maxValue?: number;
};
const NumberQuantity: FunctionComponent<Props> = ({
  type = 'sm',
  value,
  onChange,
  maxValue
}) => {
  return (
    <div
      className={classNames('flex items-center', {
        'w-[84px] border-px border-[#c8c8c8] rounded': type === 'sm'
      })}
    >
      <button
        onClick={() => {
          if (!isNaN(value) && value > 1) {
            const newValue = parseInt(value) - 1;
            console.log(newValue);
            onChange(newValue);
          }
          return false;
        }}
        className={classNames(
          'rounded-l cursor-pointer flex items-center justify-center bg-white text-[#242424]',
          {
            'w-[24px] h-[24px] border-r-px': type === 'sm',
            'w-[30px] h-[30px] p-1 border-px border-r-0 border-[#ececec]':
              type === 'md'
          }
        )}
        disabled={value <= 1}
      >
        <MinusIcon
          className={classNames({
            'w-4 h-4': type === 'sm',
            'w-5 h-5': type === 'md'
          })}
        />
      </button>
      <input
        type="text"
        className={classNames('outline-none text-center leading-6', {
          'w-[32px] text-13 py-[1px] px-[2px] border-none': type === 'sm',
          'w-[40px] text-sm h-[30px] border-px border-[#ececec]': type === 'md'
        })}
        value={value}
        maxLength={3}
        onKeyPress={(event) => {
          // if (isNaN(value + String.fromCharCode(event.keyCode))) {
          //   return false;
          // }
          console.log('press');
          return false;
        }}
        onChange={(value) => {
          console.log('change');
          // if (value == 0) {
          //   onChange(1);
          // }
          // onChange(value);
        }}
      />
      <button
        className={classNames(
          'rounded-r cursor-pointer bg-white flex items-center justify-center text-[#242424] ',
          {
            'w-[24px] h-[24px] border-l-px': type === 'sm',
            'w-[30px] h-[30px] p-1 border-px  border-l-0 border-[#ececec]':
              type === 'md'
          }
        )}
      >
        <PlusIcon
          onClick={() => {
            if (!isNaN(value)) {
              const newValue = parseInt(value) + 1;
              console.log(newValue);
              onChange(newValue);
            }
            return false;
          }}
          className={classNames({
            'w-4 h-4': type === 'sm',
            'w-5 h-5': type === 'md'
          })}
        />
      </button>
    </div>
  );
};

export default NumberQuantity;
