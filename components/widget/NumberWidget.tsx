import Field from '@components/common/Field';
import NumberInput from '@components/common/NumberInput';
import classNames from 'classnames';
import { ChangeEvent, FunctionComponent, memo, useState } from 'react';
import isNaN from 'lodash/isNaN';

type Props = {
  name: string;
  readOnly?: boolean;
  value: number;
  title: boolean;
  onChange: (e: number) => void;
  onClick?: () => any;
  label: string;
  placeholder?: string;
  focused?: boolean;
  type?: 'sm' | 'md';
};
const NumberWidget: FunctionComponent<Props> = memo(
  ({
    name,
    readOnly = false,
    onClick,
    value,
    onChange,
    title,
    children,
    placeholder,
    label,
    focused,
    type
  }) => {
    const [focus, setFocus] = useState(false);

    const clickable = readOnly && !!onClick;

    return (
      <Field
        onClick={onClick}
        noBorder={true}
        control={false}
        label={label}
        focus={focused || focus}
        labelTarget={name}
      >
        <div
          className={classNames('flex w-full h-full', {
            'w-[84px] border-px border-[#c8c8c8] rounded': type === 'sm'
          })}
        >
          <input
            type="text"
            className={classNames('outline-none w-full leading-6 text-left', {
              'w-[32px] text-13 py-[1px] px-[2px] border-none': type === 'sm',
              'w-[40px] text-sm h-[30px] border-px border-[#ececec]':
                type === 'md'
            })}
            inputMode="numeric"
            value={value}
            onKeyPress={(event) => {
              if (isNaN(`${value}${event.key}`)) {
                return false;
              }
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log('onchabge', e.target.value);
              if (e.target.value === '0' || e.target.value === '') {
                onChange(0);
                return;
              }
              if (!isNaN(e.target.value)) {
                onChange(parseInt(e.target.value));
              }
            }}
          />
        </div>
      </Field>
    );
  }
);

NumberWidget.displayName = 'nb_w';

export default NumberWidget;
