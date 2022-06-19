import { CloseIcon, PlusIcon } from '@assets/icons';
import Button from '@components/common/Button';
import Field from '@components/common/Field';
import { nanoid } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';
import { FunctionComponent, memo, useEffect, useState } from 'react';
import { ColorOption } from '@types';
import ColorOptionItemWidget from './ColorOptionItemWidget';
import NumberWidget from './NumberWidget';
import TextWidget from './TextWidget';
import UploadImageWidget from './UploadImageWidget';
import { FileImage, FilesByColorOption } from '@components/admin/editor/Editor';

type Props = {
  name: string;
  onClick?: () => void;
  value: ColorOption[];
  readOnly?: boolean;
  placeholder?: string;
  onChange: (colorOptions: ColorOption[]) => void;
  files: FilesByColorOption[];
  onChangeFilesColor: (images: FileImage[], colorId: string) => void;
  onDeleteFilesColorOption: (colorId: string) => void;
};

const ColorOptionWidget: FunctionComponent<Props> = memo(
  ({
    onClick,
    value,
    onChange,
    files,
    onChangeFilesColor,
    onDeleteFilesColorOption
  }) => {
    const [colors, setColors] = useState<ColorOption[]>(value);
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
      const colorId = colorsTemp[index].id;
      delete colorsTemp[index];
      colorsTemp = colorsTemp.filter((color) => color !== null);

      setColors(colorsTemp);
      onDeleteFilesColorOption(colorId);
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
      setColors((colors) => {
        return [
          ...colors,
          {
            ...color
          }
        ];
      });
      setExpandedItems((expandedItems) => [...expandedItems, colors.length]);
    };

    const handleChangeColorOption = (
      newColorOption: ColorOption,
      index: number
    ) => {
      setColors([
        ...colors.slice(0, index),
        newColorOption,
        ...colors.slice(index + 1)
      ]);
    };

    useEffect(() => {
      onChange(colors);
    }, [colors, onChange]);

    return (
      <Field label={'Color option'} onClick={onClick} noBorder={true}>
        {colors.length > 0 &&
          colors.map((color, index) => {
            const itemExpanded = expandedItems.indexOf(index) !== -1;
            const colorFiles = files.find(
              (files) => files.colorId === color.id
            );
            return (
              <ColorOptionItemWidget
                key={index}
                color={color}
                fields={(setItemValue, index) => (
                  <>
                    <TextWidget
                      name="name"
                      label="Name"
                      value={color.name}
                      onChange={(e) => {
                        const newColorOption = {
                          ...color,
                          name: e.target.value
                        };
                        setItemValue(newColorOption, index);
                      }}
                      title={false}
                    />
                    <NumberWidget
                      name="featureDescription"
                      label="Price"
                      value={color.price}
                      onChange={(newPrice) => {
                        const newColorOption = {
                          ...color,
                          price: newPrice
                        };
                        setItemValue(newColorOption, index);
                      }}
                      title={false}
                    />
                    <NumberWidget
                      name={''}
                      label={'Amount'}
                      value={color.amount}
                      title={false}
                      onChange={(newAmount) => {
                        const newColorOption = {
                          ...color,
                          amount: newAmount
                        };
                        setItemValue(newColorOption, index);
                      }}
                    />
                    <UploadImageWidget
                      color={color}
                      colorFiles={colorFiles}
                      onChangeFiles={onChangeFilesColor}
                    />
                  </>
                )}
                index={index}
                toggleExpand={toggleExpand}
                handleChange={handleChangeColorOption}
                itemExpanded={itemExpanded}
                onDelete={handleDelete}
              />
            );
          })}
        <Button
          className="w-full mt-4 bg-[#79829133] flex items-center justify-center"
          onClick={() =>
            addNewColor({
              id: nanoid(8),
              name: '',
              price: 0,
              amount: 0,
              images: []
            })
          }
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Color Option
        </Button>
      </Field>
    );
  }
);

ColorOptionWidget.displayName = '_cl_w';
export default ColorOptionWidget;
