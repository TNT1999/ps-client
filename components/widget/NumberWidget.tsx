import Field from '@components/common/Field';
import NumberInput from '@components/common/NumberInput';
import { ChangeEvent, FunctionComponent, useState } from 'react';
type Props = {
  name: string;
  readOnly?: boolean;
  value: number | null;
  title: boolean;
  onChange: (e?: number) => void;
  onClick?: () => any;
  label: string;
  placeholder?: string;
  focused?: boolean;
};
const NumberWidget: FunctionComponent<Props> = ({
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
      <NumberInput onChange={onChange} />
    </Field>
  );
};

export default NumberWidget;
