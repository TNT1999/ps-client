import classNames from 'classnames';
import React, {
  FunctionComponent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
  CSSProperties
} from 'react';
import SaveAndCancelButtons from '@components/common/SaveAndCancelButtons';
import { isEmpty } from 'utils/string';

type PropType = {
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string, maskSelectValue?: string) => void;
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
  readOnly?: boolean;
  optionMaskSelect?: string[];
  maskSelectValue?: string;
};

const EditableText: FunctionComponent<PropType> = ({
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
  readOnly = false,
  optionMaskSelect,
  maskSelectValue
}) => {
  const [tmpValue, setTmpValue] = useState<string>(value);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedMaskOption, setSelectedMaskOption] = useState(maskSelectValue);

  useEffect(() => {
    const trimmedValue = tmpValue.trim().replace(/\s+/g, ' ');
    setTmpValue(trimmedValue);
    onChange(trimmedValue, selectedMaskOption);
  }, [selectedMaskOption]);

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
    onChange(trimmedValue, selectedMaskOption);
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
      className={`relative flex overflow-hidden max-w-full h-full ${className} ${
        hasSaveAndCancel ? 'flex-col' : 'flex-row'
      }`}
      style={{ minHeight, maxWidth }}
    >
      {isEditing && (
        <>
          {/*prevent space character auto-trimmed when displayed on browser*/}
          <div
            className={`whitespace-pre truncate ${editClassName}`}
            style={editStyles}
          >
            {tmpValue}
          </div>
          <div className="absolute top-0 left-0 outline-none w-full h-full rounded">
            <input
              id={name}
              maxLength={maxInputLength && maxInputLength}
              ref={inputRef}
              value={tmpValue || ''}
              onKeyDown={handleKeydown}
              onChange={(e) => setTmpValue(e.target.value)}
              onBlur={handleInputBlur}
              readOnly={readOnly}
              style={{
                fontWeight: 'inherit',
                lineHeight: 'inherit',
                ...editStyles
              }}
              autoComplete="off"
              className={classNames(
                'editable-text absolute top-0 left-0 outline-none bg-transparent',
                editClassName || 'w-full h-full rounded',
                {
                  '!bg-gray-200': readOnly
                }
              )}
              placeholder={placeholder && placeholder}
            />
            {/* <div className="relative flex overflow-hidden max-w-full border border-primary-600 rounded-sm"> */}
            {optionMaskSelect && (
              <select
                onChange={(e) => setSelectedMaskOption(e.target.value)}
                className="editable-text absolute top-0 right-0 outline-none w-min h-full rounded pl-4 pr-8 py-0.5 border border-primary-600"
                value={selectedMaskOption}
              >
                {optionMaskSelect.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
          {(hasSaveAndCancel || maxCharacters != null) && (
            <div className="flex flex-row justify-between items-start mt-2">
              {maxCharacters != null && (
                <p
                  className={classNames(
                    'text-10 leading-3.5',
                    tmpValue.trim().length > maxCharacters ||
                      (!canSaveOnEmpty && isEmpty(tmpValue.trim()))
                      ? 'text-danger-500'
                      : 'text-gray-600'
                  )}
                >
                  {`${tmpValue.trim().length}/${maxCharacters}`}
                </p>
              )}
              {hasSaveAndCancel && (
                <div className="flex flex-row justify-end text-xs gap-1.5">
                  <SaveAndCancelButtons
                    onCancel={cancel}
                    onSave={save}
                    disabled={
                      (!canSaveOnEmpty && isEmpty(tmpValue.trim())) ||
                      (maxCharacters != null &&
                        tmpValue.trim().length > maxCharacters)
                    }
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditableText;
