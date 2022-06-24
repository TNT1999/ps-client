import classNames from 'classnames';
import React, {
  FunctionComponent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
  CSSProperties
} from 'react';
import { isEmpty } from 'utils/string';

type PropType = {
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  minHeight?: number;
  maxWidth?: number;
  className?: string;
  editClassName?: string;
  editStyles?: CSSProperties;
  textClassName?: string;
  hasSaveAndCancel?: boolean;
  canSaveOnEmpty?: boolean;
  maxCharacters?: number;
  maxInputLength?: number;
  placeholder?: string;
  option: any[];
};

const EditableSelect: FunctionComponent<PropType> = ({
  name,
  value,
  isEditing,
  onChange,
  minHeight = 16,
  maxWidth,
  className = '',
  editClassName,
  editStyles,
  textClassName = '',
  hasSaveAndCancel = false,
  canSaveOnEmpty = true,
  maxCharacters,
  maxInputLength,
  placeholder,
  option
}) => {
  const [tmpValue, setTmpValue] = useState<string>(value);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTmpValue(value);
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.select();
    }
  }, [isEditing]);

  const save = () => {
    const trimmedValue = tmpValue.trim().replace(/\s+/g, ' ');
    setTmpValue(trimmedValue);
    onChange(trimmedValue);
  };

  const cancel = () => {
    setTmpValue(value);
    onChange(value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (
        (!canSaveOnEmpty && isEmpty(tmpValue.trim())) ||
        (maxCharacters != null && tmpValue.trim().length > maxCharacters)
      ) {
        return;
      }

      save();
    } else if (e.key === 'Escape') {
      cancel();
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (hasSaveAndCancel) {
      return;
    }

    save();
  };

  return (
    <div
      ref={ref}
      className={`relative flex overflow-hidden max-w-full ${className} ${
        hasSaveAndCancel ? 'flex-col' : 'flex-row'
      }`}
      style={{ minHeight, maxWidth }}
    >
      <select
        className={classNames(
          'editable-text absolute top-0 left-0 outline-none w-full h-full rounded px-1 py-0.5 border border-primary-600 bg-transparent'
        )}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      >
        {option.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditableSelect;
