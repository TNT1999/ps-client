import { CloseIcon, DragIndicatorIcon } from '@assets/icons';
import { Attribute } from '@components/admin/editor/Editor';
import EditableSelect from '@components/common/EditableSelect';
import EditableText from '@components/common/EditableText';
import Field from '@components/common/Field';
import { FunctionComponent, memo, useState } from 'react';

type Props = {
  attribute: Attribute;
  onChange: (newAttributeItem: Attribute, index: number) => void;
  index: number;
  handleDelete: (index: number) => void;
};

const renderDynamicWidget = (
  attribute: Attribute,
  index: number,
  onChange: (value: string) => void
) => {
  switch (attribute.type) {
    case 'select':
      return (
        <EditableSelect
          className="h-full"
          name={''}
          value={attribute.value}
          isEditing={false}
          onChange={onChange}
          option={attribute.option || []}
        />
      );
    default:
      return (
        <EditableText
          className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
          editClassName="min-w-1 border border-primary-600 rounded-sm px-1 py-0.5"
          editStyles={{ width: 'calc(100% - 0px)' }}
          minHeight={24}
          value={attribute.value}
          onChange={onChange}
          isEditing={true}
          placeholder={'Value'}
          name={''}
        />
      );
  }
};
const AttributeWidgetItem: FunctionComponent<Props> = memo(
  ({ attribute, onChange, index, handleDelete }) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleNameChanged = (name: string) => {
      const newAttribute = {
        ...attribute,
        name
      };
      onChange(newAttribute, index);
    };
    const handleValueChanged = (value: string) => {
      const newAttribute = {
        ...attribute,
        value
      };
      onChange(newAttribute, index);
    };

    return (
      <div
        className="flex items-center border-l-2 hover:border-[#00C2B2] duration-400 transition-all select-none group relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <DragIndicatorIcon className="text-gray-300 hover:text-gray-500 cursor-move group-hover:text-gray-500 drag-handle" />
        <div className="flex flex-1 gap-x-2 max-w-[calc(100%-20px)]">
          <div className="flex-1 overflow-hidden">
            <EditableText
              name={`${index}-name`}
              className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
              editClassName="min-w-1 border border-primary-600 rounded-sm px-1 py-0.5"
              editStyles={{ width: 'calc(100% - 0px)' }}
              minHeight={24}
              value={attribute.name}
              onChange={handleNameChanged}
              isEditing={true}
              placeholder={'Name'}
              readOnly={attribute.canEditName === false}
            />
          </div>
          <div className="flex-3 overflow-hidden">
            {renderDynamicWidget(attribute, index, handleValueChanged)}
            {/* <EditableText
              name={`${index}-value`}
              className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
              editClassName="min-w-1 bg-white border border-primary-600 rounded-sm px-1 py-0.5"
              editStyles={{ width: 'calc(100% - 0px)' }}
              minHeight={24}
              value={attribute.value}
              onChange={handleValueChanged}
              isEditing={true}
              placeholder={'Value'}
            /> */}
          </div>
          {/* <div className="flex-3 overflow-hidden">
            <EditableSelect
              name={`${index}-value`}
              className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
              editClassName="min-w-1 bg-white border border-primary-600 rounded-sm px-1 py-0.5"
              editStyles={{ width: 'calc(100% - 0px)' }}
              minHeight={24}
              value={attribute.value}
              onChange={handleValueChanged}
              isEditing={true}
              placeholder={'Value'}
            />
          </div> */}

          {isHovering && !(attribute.canDelete === false) && (
            <div
              className="absolute inset-y-0 right-0 cursor-pointer flex justify-center items-center z-10"
              onClick={() => handleDelete(index)}
            >
              <CloseIcon className="text-red-500" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

AttributeWidgetItem.displayName = '_attr_i';

export default AttributeWidgetItem;
