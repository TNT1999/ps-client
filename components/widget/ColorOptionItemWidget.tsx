import { CloseIcon } from '@assets/icons';
import Button from '@components/common/Button';
import Tree from '@components/common/Tree';
import { FunctionComponent, useState } from 'react';
import { ColorOption } from '@types';

type TreeType = 'success' | 'danger';
type Props = {
  color: ColorOption;
  fields: (func: any, index: number) => React.ReactNode;
  index: number;
  toggleExpand: (index: number) => void;
  handleChange: () => void;
  itemExpanded: boolean;
  onDelete: (index: number) => void;
};

const ColorOptionItemWidget: FunctionComponent<Props> = ({
  color,
  fields,
  index,
  handleChange,
  toggleExpand,
  itemExpanded,
  onDelete
}) => {
  const [treeType, setTreeType] = useState<TreeType | null>('success');

  return (
    <div className="relative">
      <Tree
        expanded={itemExpanded}
        onExpandToggle={() => toggleExpand(index)}
        type={treeType}
        onHeaderMouseEnter={() => setTreeType('success')}
        onHeaderMouseLeave={() => setTreeType(null)}
        label={color.name}
        actions={() => (
          <Button
            transparent
            size="sm"
            onMouseEnter={() => setTreeType('danger')}
            onMouseLeave={() => setTreeType(null)}
            onClick={() => onDelete(index)}
          >
            <CloseIcon />
          </Button>
        )}
        description={''}
      >
        {fields && fields(handleChange, index)}
      </Tree>
    </div>
  );
};

export default ColorOptionItemWidget;
