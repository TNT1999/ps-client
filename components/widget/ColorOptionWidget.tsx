import { CloseIcon, PlusIcon } from '@assets/icons';
import Button from '@components/common/Buton';
import Field from '@components/common/Field';
import { nanoid } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';
import { FunctionComponent, useState } from 'react';
import { ColorOption } from 'types';
import ColorOptionItemWidget from './ColorOptionItemWidget';
import NumberWidget from './NumberWidget';
import TextWidget from './TextWidget';

type Props = {
  name: string;
  onClick?: () => void;
  value: string;
  readOnly?: boolean;
  placeholder?: string;
  onNameChanged: (name: string) => void;
  onValueChanged: (value: string) => void;
};

const ColorOptionWidget: FunctionComponent<Props> = ({ onClick }) => {
  const [colors, setColors] = useState<ColorOption[]>([
    {
      id: nanoid(),
      name: 'ew',
      price: 12,
      amount: 1212,
      images: ['sadsd', 'asdd']
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<number[]>([]); // list index of explandItem
  const deleteColor = (id: string) => {
    const removedColor = colors.filter((color) => color.id !== id);
    setColors(removedColor);
  };

  const handleDelete = (index: number) => {
    let colorsTemp = [...colors];
    const isExpanded = expandedItems.indexOf(index) !== -1;

    if (isExpanded) {
      toggleExpand(index);
    }

    delete colorsTemp[index];
    colorsTemp = colorsTemp.filter((color) => color !== null);

    setColors(colorsTemp);
    // this.setState({ items }, () => this.props.onChange(this.state.items));
  };

  const toggleExpand = (index: number) => {
    let expandedItemsTemp = [...expandedItems];
    const expandedItemsIndex = expandedItemsTemp.indexOf(index);
    const isExpanded = expandedItemsIndex !== -1;

    if (isExpanded) {
      delete expandedItemsTemp[expandedItemsIndex];
      expandedItemsTemp = expandedItemsTemp.filter((id) => id !== null);
    } else {
      expandedItemsTemp.push(index);
    }
    setExpandedItems(expandedItemsTemp);
  };
  const addNewColor = (color: ColorOption) => {
    console.log(colors.length);
    setColors((colors) => {
      return [
        ...colors,
        {
          ...color
        }
      ];
    });
    console.log(colors.length);
    setExpandedItems((expandedItems) => [...expandedItems, colors.length]);
  };
  return (
    <Field label={'Color option'} onClick={onClick} noBorder={true}>
      {colors.length > 0 &&
        colors.map((color, index) => {
          const itemExpanded = expandedItems.indexOf(index) !== -1;
          return (
            <ColorOptionItemWidget
              key={index}
              color={color}
              fields={(setItemValue, index) => (
                <>
                  <TextWidget
                    name="featureTitle"
                    label="Name"
                    value={'ádas'}
                    onChange={(featureTitle) =>
                      setItemValue({ featureTitle }, index)
                    }
                    title={false}
                  />
                  <TextWidget
                    name="featureDescription"
                    label="Price"
                    value={'ass'}
                    onChange={(featureDescription) =>
                      setItemValue({ featureDescription }, index)
                    }
                    title={false}
                  />
                  <NumberWidget
                    name={''}
                    value={121212}
                    title={false}
                    onChange={function (e?: number): void {
                      throw new Error('Function not implemented.');
                    }}
                    label={'Amount'}
                  />
                </>
              )}
              index={index}
              toggleExpand={toggleExpand}
              handleChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              itemExpanded={itemExpanded}
              onDelete={handleDelete}
            />
          );
        })}
      <Button
        className="w-full mt-4 bg-[#79829133] flex items-center justify-center"
        onClick={() =>
          addNewColor({
            id: nanoid(),
            name: 'ew',
            price: 12,
            amount: 1212,
            images: ['sadsd', 'asdd']
          })
        }
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Color Option
      </Button>
    </Field>
  );
};
export default ColorOptionWidget;
