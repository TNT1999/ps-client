import { CloseIcon, DragIndicatorIcon } from '@assets/icons';
import EditableText from '@components/common/EditableText';
import Field from '@components/common/Field';
import { FunctionComponent, useState } from 'react';

type Props = any;
const AttributeWidgetItem: FunctionComponent<Props> = ({ value, onChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  const onClick = (e: any) => console.log(e);
  const name = 'a';
  const handleNameChanged = (name: string) => {
    console.log(name);
  };
  const handleValueChanged = (value: string) => {
    console.log(value);
  };
  return (
    <div
      className="flex items-center border-l-2 hover:border-[#00C2B2] duration-400 transition-all select-none group"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <DragIndicatorIcon className="text-gray-300 hover:text-gray-500 cursor-move group-hover:text-gray-500 drag-handle" />
      <div className="flex-1">
        <EditableText
          name={`${name.toLowerCase()}-name`}
          className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
          editClassName="min-w-1 bg-white border border-primary-600 rounded-sm px-1 py-0.5"
          editStyles={{ width: 'calc(100% - 16px)' }}
          minHeight={24}
          value={value}
          onChange={handleNameChanged}
          isEditing={true}
          placeholder={'Name'}
        />
      </div>
      <div className="flex-2">
        <EditableText
          name={`${name.toLowerCase()}-value`}
          className="text-gray-900 text-12 truncate bg-transparent flex-grow select-none"
          editClassName="min-w-1 bg-white border border-primary-600 rounded-sm px-1 py-0.5"
          editStyles={{ width: 'calc(100% - 16px)' }}
          minHeight={24}
          value={value}
          onChange={handleValueChanged}
          isEditing={true}
          placeholder={'Value'}
        />
      </div>
      {/* {isHovering && <CloseIcon className=" w-4 h-4 text-gray-900" />} */}
    </div>
  );
};

export default AttributeWidgetItem;
