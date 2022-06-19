import { PlusIcon } from '@assets/icons';
import Button from '@components/common/Button';
import EditableText from '@components/common/EditableText';
import Field from '@components/common/Field';
import { isNotEmpty } from '@utils/string';
import {
  ChangeEvent,
  FunctionComponent,
  memo,
  useEffect,
  useState
} from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import AttributeWidgetItem from './AttributeWidgetItem';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { Attribute } from '@components/admin/editor/Editor';
import axiosClient from '@utils/api';
import useAsyncEffect from 'use-async-effect';
type Props = {
  name: string;
  onClick?: () => void;
  value: any[];
  readOnly?: boolean;
  placeholder?: string;
  onChange: (attrs: Attribute[]) => void;
};

const AttributeWidget: FunctionComponent<Props> = memo(
  ({ name, onClick, value, readOnly, placeholder, onChange }) => {
    const [items, setItems] = useState<Attribute[]>(value);
    const [isCollapsed, setIsCollapsed] = useState(true);
    // const [brands, setBrands] = useState<any[]>();
    const newAttribute = () => {
      setItems([
        ...items,
        {
          name: '',
          value: ''
        }
      ]);
      setIsCollapsed(false);
    };
    const onDrop = (e: any) => {
      const cloneItems = [...items];
      const [movingItem] = cloneItems.splice(e.removedIndex, 1);
      cloneItems.splice(e.addedIndex, 0, movingItem);
      setItems([...cloneItems]);
    };
    const handleChange = (newAttributeItem: Attribute, index: number) => {
      setItems([
        ...items.slice(0, index),
        newAttributeItem,
        ...items.slice(index + 1)
      ]);
    };

    const handleDelete = (index: number) => {
      const cloneItems = [...items];
      cloneItems.splice(index, 1);
      setItems([...cloneItems]);
    };

    // useAsyncEffect(async () => {
    //   const brands: any[] = await axiosClient.get('brands');
    //   setBrands(brands);
    // }, []);

    useEffect(() => {
      onChange(items);
    }, [items, onChange]);

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
              {items.map((attribute, index) => (
                <Draggable key={index}>
                  <AttributeWidgetItem
                    index={index}
                    attribute={attribute}
                    onChange={handleChange}
                    handleDelete={handleDelete}
                  />
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
  }
);

AttributeWidget.displayName = '_attrs_w';
export default AttributeWidget;
