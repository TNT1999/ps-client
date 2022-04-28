import { PlusIcon } from '@assets/icons';
import Button from '@components/common/Buton';
import EditableText from '@components/common/EditableText';
import Field from '@components/common/Field';
import { isNotEmpty } from '@utils/string';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import AttributeWidgetItem from './AttributeWidgetItem';
import { motion } from 'framer-motion';
import cx from 'classnames';
type Props = {
  name: string;
  onClick?: () => void;
  value: string;
  readOnly?: boolean;
  placeholder?: string;
  onNameChanged: (name: string) => void;
  onValueChanged: (value: string) => void;
};

const AttributeWidget: FunctionComponent<Props> = ({
  name,
  onClick,
  value,
  readOnly,
  placeholder,
  onNameChanged,
  onValueChanged
}) => {
  const [items, setItems] = useState([1, 2, 3]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const newAttribute = () => {
    setItems([...items, items.length + 1]);
    setIsCollapsed(false);
  };
  const deleteAttribute = (name: string) => {
    setItems(items);
  };
  const onDrop = (e) => {
    console.log(e);
  };
  return (
    <Field
      label={'Product Attribute'}
      labelTarget={`${name.toLowerCase()}-name`}
      onClick={onClick}
      noBorder={true}
    >
      {items.length > 0 && (
        <Button
          size="sm"
          className="absolute top-0 right-0 bg-[#79829133]"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </Button>
      )}

      {items.length > 0 && (
        <motion.div
          className={cx({
            'pointer-events-none': isCollapsed
          })}
          variants={{
            expanded: {
              opacity: 1,
              height: 'auto',
              marginTop: '2rem'
            },
            collapsed: {
              opacity: 0,
              height: 0,
              marginTop: 0
            }
          }}
          initial={isCollapsed ? 'collapsed' : 'expanded'}
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          transition={{ duration: 0.2 }}
        >
          <Container
            animationDuration={200}
            lockAxis="y"
            dragHandleSelector=".drag-handle"
            onDrop={onDrop}
            behaviour="contain"
          >
            {items.map((data, index) => (
              <Draggable key={index}>
                <AttributeWidgetItem value={data.toString()} />
              </Draggable>
            ))}
          </Container>
        </motion.div>
      )}
      <Button
        className="w-full mt-4 bg-[#79829133] flex items-center justify-center"
        onClick={newAttribute}
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add New Attribute
      </Button>
    </Field>
  );
};
export default AttributeWidget;
