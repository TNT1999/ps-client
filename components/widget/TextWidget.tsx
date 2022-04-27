import Field from '@components/common/Field';
import { ChangeEvent, FunctionComponent, useState } from 'react';
type Props = {
  name: string;
  readOnly?: boolean;
  value: string;
  title: boolean;
  onChange: (e: string) => void;
  onClick?: () => any;
  label: string;
  placeholder?: string;
  focused?: boolean;
};
const TextWidget: FunctionComponent<Props> = ({
  name,
  readOnly = false,
  onClick,
  value,
  onChange,
  title,
  children,
  placeholder,
  label,
  focused
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
      <input
        className=" border-none bg-none outline-none text-[#0E1E25] w-full placeholder:text-[#BCC0CD]"
        type="text"
        id={name}
        name={name}
        readOnly={readOnly}
        value={value}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={
          placeholder
            ? placeholder
            : label
            ? `Type ${label.toLowerCase()} here`
            : ''
        }
      />
      {children && children}
    </Field>
  );
};

export default TextWidget;
