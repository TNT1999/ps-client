import Field from '@components/common/Field';
import ToggleSwitch from '@components/common/ToggleSwitch';
import { FunctionComponent } from 'react';
type Props = {
  name: string;
  label: string;
  onChange: (e: boolean) => void;
  placeholder?: string;
  value: boolean;
};
const BooleanWidget: FunctionComponent<Props> = ({
  name,
  label,
  onChange,
  value,
  children
}) => {
  return (
    <Field
      label={label}
      labelTarget={name}
      control
      noBorder={true}
      onClick={() => (value ? onChange(false) : onChange(true))}
    >
      <ToggleSwitch
        onChange={() => (value ? onChange(false) : onChange(true))}
        checked={value}
      />
      {children && children}
    </Field>
  );
};

export default BooleanWidget;
