import { SelectIndicatorIcon } from '@assets/icons';
import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { ColorOption } from '@types';

type Props = {
  colorOptions: ColorOption[];
  selectedColorOption: ColorOption;
  changeColorOption: Dispatch<SetStateAction<ColorOption>>;
  discount: number;
};
const ColorOptionBox: FunctionComponent<Props> = ({
  colorOptions,
  selectedColorOption,
  changeColorOption,
  discount
}) => {
  const handleChangeColorOption = (item: ColorOption) => {
    changeColorOption(item);
  };
  return (
    <div className="flex flex-wrap">
      {!isEmpty(colorOptions) &&
        colorOptions.map((item: ColorOption, index: number) => (
          <div
            onClick={() => handleChangeColorOption(item)}
            key={index}
            className={classNames(
              'cursor-pointer rounded mb-[10px] mr-[10px] flex items-center text-center w-[calc((100%-10px*3)/3)] border p-[2px] py-2 last:mr-0 relative',
              {
                'border-[#0d5cb6] bg-[#e5f2ff]':
                  selectedColorOption.id === item.id,
                'border-[#f2f2f2] bg-[#f2f2f2]':
                  selectedColorOption.id !== item.id,
                'pointer-events-none opacity-50': Number(item.amount) <= 0
              }
            )}
          >
            <div className="w-12 h-12 shrink-0">
              <img src={item.images[0]} alt="" className="object-contain" />
            </div>
            <div className="flex flex-col flex-1 mx-2 text-left">
              <div className="font-medium text-base mb-1 text-ellipsis-2-lines">
                {item.name}
              </div>
              <div className="text-red-600 font-medium text-sm">
                {discount
                  ? formatMoney(item.price * (100 - discount) * 0.01)
                  : formatMoney(item.price)}
              </div>
            </div>
            {selectedColorOption.id === item.id && (
              <SelectIndicatorIcon className="text-[#0D5CB6] absolute -top-px -right-px" />
            )}
          </div>
        ))}
    </div>
  );
};

export default ColorOptionBox;
