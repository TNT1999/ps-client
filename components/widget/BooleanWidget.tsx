import Field from '@components/common/Field';
import ToggleSwitch from '@components/common/ToggleSwitch';
import { FunctionComponent, memo } from 'react';
type Props = {
  name: string;
  label: string;
  onChange: (name: string, e: boolean) => void;
  placeholder?: string;
  value: boolean;
};
const BooleanWidget: FunctionComponent<Props> = memo(
  ({ name, label, onChange, value, children }) => {
    return (
      <Field
        label={label}
        labelTarget={name}
        control
        noBorder={true}
        onClick={() => (value ? onChange(name, false) : onChange(name, true))}
      >
        <ToggleSwitch
          onChange={() =>
            value ? onChange(name, false) : onChange(name, true)
          }
          checked={value}
        />
        {children && children}
      </Field>
    );
  }
);

BooleanWidget.displayName = 'bl_w';
export default BooleanWidget;
