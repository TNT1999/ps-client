import { FunctionComponent, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { isEmpty } from '@utils/string';
import { NumberCaretDownIcon, NumberCaretUpIcon } from '@assets/icons';
import isNaN from 'lodash/isNaN';
type Props = {
  arrowWidth?: number;
  initValue?: number | null;
  disabled?: boolean;
  containerClassName?: string;
  onChange: (value: number) => void;
  inputClassName?: string;
};
const NumberInput: FunctionComponent<Props> = ({
  arrowWidth,
  containerClassName,
  disabled,
  initValue,
  onChange,
  inputClassName
}) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeValue = (changedValue: string) => {
    const newValue = isEmpty(changedValue) ? 0 : parseInt(changedValue);
    setValue(newValue);
    onChange(newValue);
  };
  const changeValue = (diff: number) => {
    const newValue = (value || 0) + diff;
    if (newValue < 1) return;
    setValue(newValue);
    onChange(newValue);
    inputRef.current?.select();
  };
  const handleBlur = () => {
    if (value == null || value < 1) {
      setValue(1);
      onChange(1);
    }
  };
  return (
    <div className={cx('flex w-full h-full', containerClassName)}>
      <input
        ref={inputRef}
        className={cx('w-full h-full outline-none select-none', inputClassName)}
        value={value != null ? value : ''}
        type="number"
        disabled={disabled}
        onChange={(e) => handleChangeValue(e.target.value)}
        onBlur={() => handleBlur()}
      />
      <div
        className="flex-shrink-0 flex flex-col ml-3"
        style={{ width: arrowWidth }}
      >
        <div
          className="hover:bg-gray-400 h-full flex items-center justify-center"
          onClick={() => changeValue(1)}
        >
          <NumberCaretUpIcon className="text-gray-500 fill-current" />
        </div>
        <div
          className="hover:bg-gray-400 h-full flex items-center justify-center"
          onClick={() => changeValue(-1)}
        >
          <NumberCaretDownIcon className="text-gray-500 fill-current" />
        </div>
      </div>
    </div>
  );
};
export default NumberInput;
